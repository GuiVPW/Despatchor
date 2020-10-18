import { ForbiddenError } from 'apollo-server-express'
import { prisma } from '../../..'
import {
  COMMENT_CREATED,
  COMMENT_REMOVED,
  pubsub
} from '../../constants/subscriptions'

const resolvers = {
  Mutation: {
    createComment: async (
      _,
      { creationInput: { authorId, postId, comment } }
    ) => {
      try {
        const newComment = await prisma.comment.create({
          data: {
            author: {
              connect: {
                id: authorId
              }
            },
            comment,
            post: {
              connect: {
                id: postId
              }
            },
            createdAt: new Date()
          },
          include: {
            author: true,
            post: true
          }
        })

        if (!newComment) throw new ForbiddenError('Você não criou o comentário')

        pubsub.publish(COMMENT_CREATED, { commentCreated: newComment })

        return newComment
      } catch (e) {
        console.log(e)
        throw new ForbiddenError('Erro ao tentar criar o comentário')
      }
    },
    removeComment: async (_, { deleteInput: { commentId } }) => {
      try {
        const comment = await prisma.comment.findOne({
          where: {
            id: commentId
          }
        })

        if (!comment)
          throw new ForbiddenError('Comentário não existe ou já foi removido')

        const deleteComment = await prisma.comment.delete({
          where: {
            id: commentId
          }
        })

        if (!deleteComment)
          throw new ForbiddenError('Comentário não existe ou já foi removido')

        pubsub.publish(COMMENT_CREATED, deleteComment.id)

        return true
      } catch (e) {
        console.log(e)
        throw new ForbiddenError('Erro ao tentar remover o comentário')
      }
    }
  },
  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterator(COMMENT_CREATED)
    },
    commentRemoved: {
      subscribe: () => pubsub.asyncIterator(COMMENT_REMOVED)
    }
  }
}

export default resolvers
