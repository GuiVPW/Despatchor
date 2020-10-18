import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { prisma } from '../../..'
import getAuthorId from './utils/getAuthorId'

class CommentOrPostOwnerDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const [, { postId, commentId }, { req }] = args

      const authorId = getAuthorId(req)

      const isCommentOwner = await prisma.comment.findOne({
        where: {
          id: commentId
        },
        select: {
          postId
        }
      })

      if (!isCommentOwner)
        var isPostOwner = await prisma.post.findOne({
          where: {
            id: postId,
            authorId
          }
        })

      if (!isCommentOwner || !isPostOwner)
        throw new ForbiddenError(
          'Apenas o dono do comentário ou do post pode fazer essa ação'
        )

      return resolve.apply(this, args)
    }
  }
}

export default CommentOrPostOwnerDirective