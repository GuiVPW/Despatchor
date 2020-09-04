import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from '../../../index'

import authConfig from '../../config/auth.json'

import { PubSub } from 'apollo-server'

const pubsub = new PubSub()

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => {
      return prisma.user.findOne({ where: { id } })
    },

    post: (_, { id }) => {
      return prisma.post.findOne({ where: { id } })
    },

    posts: () => prisma.post.findMany(),

    checkAuth: async (_, { token }) => {
      try {
        if (token === '') {
          return false
        }

        jwt.verify(token, authConfig.secret, (err, decoded) => {
          if (err) {
            throw new Error('Esse jwt não é válido')
          } else {
            return decoded
          }
        })
      } catch (e) {
        throw new Error(e)
      }
    }
  },

  Mutation: {
    createUser: async (_, { email, password, name, username, bio }) => {
      try {
        if (
          await prisma.user.findOne({
            where: { email }
          })
        ) {
          throw new Error('Erro: email já utilizado.')
        }
        const user = await prisma.user.create({
          data: {
            email,
            password: bcrypt.hashSync(password, 10),
            username,
            profile: {
              create: {
                bio
              }
            },
            name
          }
        })

        return user
      } catch (e) {
        console.log(e)
        return e
      }
    },

    login: async (_, { email, password }) => {
      try {
        const encryptedPassword = bcrypt.hashSync(password, 10)

        const user = await prisma.user.findOne({
          where: {
            email
          },
          include: { avatar: true }
        })

        if (!user) return new Error('Erro: email não encontrado!')

        if (!(await bcrypt.compare(encryptedPassword, user.password)))
          return new Error('Erro: senha incorreta!')

        const token = jwt.sign(
          {
            _id: user.id,
            email: user.email,
            user: user.username,
            avatar: user.avatar.filename
          },
          authConfig.secret,
          {
            expiresIn: '86400'
          }
        )

        const jwtToken = {
          username: user.username,
          userimage: user.avatar.filename,
          email: user.email,
          token
        }

        return jwtToken
      } catch (e) {
        return e
      }
    },
    createPost: async (_, { id, title, description, image }) => {
      try {
        try {
          const user = await prisma.user.findOne({ where: { id } })
          if (!user) throw new Error('Usuário não encontrado!')

          const post = await prisma.post.create({
            data: {
              author: {
                connect: {
                  id
                }
              },
              title,
              description,
              postImage: {
                create: image
              },
              published: true,
              createdAt: new Date()
            }
          })

          pubsub.publish('POST_CREATED', {
            post
          })

          return post
        } catch (e) {
          return new Error(e)
        }
      } catch (e) {
        console.log(e)
        return e
      }
    },

    addLike: async (_, { id }) => {
      try {
        const postId = await prisma.post.findOne({
          where: {
            id
          }
        })

        const post = await prisma.post.update({
          data: {
            likes: postId.likes + 1
          },
          where: {
            id
          }
        })

        pubsub.publish('POST_LIKED', { postLiked: post })

        return post.likes
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

        pubsub.publish('POST_DESLIKED', { postDesliked: post })

        return post
      } catch (e) {
        throw new Error('Houve um problema, tente novamente')
      }
    },

    removePost: async (_, { id }) => {
      try {
        const postId = await prisma.post.findOne({
          where: {
            id
          }
        })
        const post = await prisma.post.delete({ where: { id } })

        pubsub.publish('POST_REMOVED', { postRemoved: post })

        return 'Removido com sucesso'
      } catch (e) {
        throw new Error('Falha na remoção')
      }
    }
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator('POST_CREATED')
    },
    postLike: {
      subscribe: () => pubsub.asyncIterator('POST_LIKED')
    },
    postDeslike: {
      subscribe: () => pubsub.asyncIterator('POST_DESLIKED')
    },
    postRemoved: {
      subscribe: () => pubsub.asyncIterator('POST_REMOVED')
    }
  }
}

export default resolvers
