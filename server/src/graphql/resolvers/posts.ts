import { storeUpload } from '../../utils/storeUpload'
import { prisma } from '../../../index'
import {
  POST_CREATED,
  POST_LIKES,
  POST_REMOVED,
  POST_EDITED,
  pubsub
} from '../../constants/subscriptions'
import { ForbiddenError, ValidationError } from 'apollo-server-express'

const resolvers = {
  Query: {
    post: async (_, { id }) => {
      const post = await prisma.post.findOne({ where: { id } })
      return post
    },

    posts: async () =>
      prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      })
  },
  Mutation: {
    createPost: async (
      _,
      { creationInput: { id, title, description, imageUrl } }
    ) => {
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

    editPost: async (
      _,
      { editionInput: { id, title, description, imageUrl } }
    ) => {
      try {
        const post = await prisma.post.findOne({
          where: {
            id
          }
        })

        if (!post) throw new ValidationError('Esse post não existe!')

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
        throw new ForbiddenError('Falha na remoção')
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
        throw new ForbiddenError('Falha na remoção')
      }
    },

    addLike: async (_, { id, postId }) => {
      try {
        const post = await prisma.post.findOne({
          where: {
            id: postId
          }
        })

        if (!post) throw new ForbiddenError('Post não encontrado')

        const postLiked = await prisma.postsLike.findMany({
          where: {
            postId,
            userId: id
          }
        })
        if (postLiked.length !== 0) {
          const removeLike = await prisma.post.update({
            data: {
              likes: post.likes - 1,
              likers: {
                delete: {
                  userId: id
                }
              }
            },
            where: {
              id: postId
            },
            include: {
              author: true,
              comment: true,
              likers: {
                include: {
                  user: true
                }
              }
            }
          })

          await pubsub.publish(POST_LIKES, { postLikes: removeLike })
          return post.likes
        }

        const addLike = await prisma.post.update({
          data: {
            likes: post.likes + 1,
            likers: {
              create: {
                user: {
                  connect: {
                    id
                  }
                }
              }
            }
          },
          where: {
            id: postId
          },
          include: {
            author: true,
            comment: true,
            likers: {
              include: {
                user: true
              }
            }
          }
        })

        await pubsub.publish(POST_LIKES, { postLikes: addLike })
        return post.likes
      } catch (e) {
        throw new ForbiddenError('Não foi possível completar a operação')
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
