import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../index'
import authConfig from '../../config/auth.json'
import {
  POST_CREATED,
  POST_LIKES,
  POST_REMOVED,
  POST_EDITED,
  pubsub
} from '../../constants/subscriptions'
import { storeUpload } from '../../utils/storeUpload'

const resolvers = {
  Query: {
    users: async () => prisma.user.findMany({ include: { profile: true } }),
    user: async (_, { id }) => {
      const user = await prisma.user.findOne({
        where: { id },
        include: { profile: true, posts: true }
      })
      return user
    },

    post: async (_, { id }) => {
      const post = await prisma.post.findOne({ where: { id } })
      return post
    },

    posts: async () => prisma.post.findMany(),

    checkAuth: async (_, { token }) => {
      try {
        if (token === '') {
          throw new Error('Nenhum token enviado.')
        }

        const verify = jwt.verify(token, authConfig.secret, (err, decoded) => {
          if (err) {
            throw new Error('Esse jwt não é válido.')
          } else {
            const token = jwt.sign(
              {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username
              },
              authConfig.secret,
              {
                expiresIn: '86400'
              }
            )

            const jwtToken = {
              id: decoded.id,
              username: decoded.username,
              email: decoded.email,
              token
            }

            return jwtToken
          }
        })

        return verify
      } catch (e) {
        throw new Error(e)
      }
    }
  },

  Mutation: {
    createUser: async (
      _,
      { email, password, name, username, bio, avatarUrl }
    ) => {
      try {
        if (
          await prisma.user.findOne({
            where: { email }
          })
        ) {
          throw new Error('Erro: email já utilizado.')
        }

        if (avatarUrl) {
          const { createReadStream, filename } = await avatarUrl
          console.log(avatarUrl)
          const stream = createReadStream()
          var { path } = await storeUpload({
            stream,
            filename,
            id: avatarUrl.id,
            folder: 'users'
          })
        }
        const user = await prisma.user.create({
          data: {
            email,
            password: bcrypt.hashSync(password, 10),
            username,
            avatarUrl: path,
            name,
            profile: {
              create: {
                bio
              }
            }
          }
        })

        return user
      } catch (e) {
        console.log(e)
        return e
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const user = await prisma.user.findOne({
          where: { id },
          include: { profile: true, posts: true }
        })

        if (user.profile !== null)
          await prisma.profile.delete({ where: { userId: id } })
        if (user.posts.length !== 0) await prisma.post.delete({ where: { id } })

        const userDelete = await prisma.user.delete({
          where: { id }
        })
        if (!user) throw new Error('Não foi possível excluir o usuário!')
        return 'Usuário deletado com sucesso!'
      } catch (e) {
        throw new Error(e)
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await prisma.user.findOne({
          where: {
            email
          }
        })

        if (!user) return new Error('Erro: email não encontrado!')

        if (!(await bcrypt.compare(password, user.password)))
          return new Error('Erro: senha incorreta!')

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
            image: user.avatarUrl
          },
          authConfig.secret,
          {
            expiresIn: '86400'
          }
        )

        const jwtToken = {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.avatarUrl,
          token
        }

        return jwtToken
      } catch (e) {
        return e
      }
    },
    createPost: async (_, { id, title, description, imageUrl }) => {
      try {
        const user = await prisma.user.findOne({ where: { id } })
        if (!user) throw new Error('Usuário não encontrado!')

        if (imageUrl) {
          const { createReadStream, filename } = await imageUrl
          const stream = createReadStream()
          var { path } = await storeUpload({
            stream,
            filename,
            id: imageUrl.id,
            folder: 'users'
          })
        }
        const post = await prisma.post.create({
          data: {
            author: {
              connect: {
                id
              }
            },
            title,
            description,
            postImageUrl: path,
            published: true,
            createdAt: new Date()
          }
        })

        pubsub.publish(POST_CREATED, { postCreated: post })

        console.log(post)

        return post
      } catch (e) {
        console.log(e)
        return e
      }
    },

    editPost: async (_, { id, title, description, imageUrl }) => {
      try {
        const post = await prisma.post.findOne({
          where: {
            id
          }
        })

        if (!post) throw new Error('Esse post não existe!')

        if (imageUrl) {
          const { createReadStream, filename } = await imageUrl
          const stream = createReadStream()
          var { path } = await storeUpload({
            stream,
            filename,
            id: post.id,
            folder: 'posts'
          })
        }

        const postUpdated = await prisma.post.update({
          where: { id },
          data: {
            description,
            title,
            postImageUrl: path
          }
        })

        pubsub.publish(POST_EDITED, { postRemoved: post })

        return postUpdated
      } catch (e) {
        throw new Error('Falha na remoção')
      }
    },

    removePost: async (_, { id }) => {
      try {
        const postId = await prisma.post.findOne({
          where: {
            id
          }
        })

        if (!postId) throw new Error('Post não existe!')
        const post = await prisma.post.delete({ where: { id } })

        pubsub.publish(POST_REMOVED, { postRemoved: post })

        return 'Removido com sucesso'
      } catch (e) {
        throw new Error('Falha na remoção')
      }
    },

    addLike: async (_, { id, postId }) => {
      try {
        const userLiked = await prisma.post.findOne({
          where: {
            id: postId
          },
          include: {
            likeUsers: {
              select: {
                id
              }
            }
          }
        })

        if (!userLiked.likeUsers.id) {
          const post = await prisma.post.findOne({
            where: {
              id: postId
            }
          })
          const postLikes = await prisma.post.update({
            data: {
              likes: post.likes + 1,
              likeUsers: {
                connect: {
                  id
                }
              }
            },
            where: {
              id
            }
          })
          await pubsub.publish(POST_LIKES, { postLikes })
          return post.likes
        }
      } catch (e) {
        throw new Error('Houve um problema, tente novamente')
      }
    },

    removeLike: async (_, { id }) => {
      try {
        const postId = await prisma.post.findOne({
          where: {
            id
          }
        })

        const post = await prisma.post.update({
          data: {
            likes: postId.likes - 1
          },
          where: {
            id
          }
        })

        console.log(post)

        pubsub.publish(POST_LIKES, { postLikes: post })

        return post.likes
      } catch (e) {
        throw new Error('Houve um problema, tente novamente')
      }
    }
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(POST_CREATED)
    },
    postLikes: {
      subscribe: () => pubsub.asyncIterator(POST_LIKES)
    },
    postRemoved: {
      subscribe: () => pubsub.asyncIterator(POST_REMOVED)
    }
  }
}

export default resolvers
