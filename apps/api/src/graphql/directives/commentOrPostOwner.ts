import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { prisma } from '../../main'
import getAuthorId from './utils/getAuthorId'

class CommentOrPostOwnerDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async (...args) => {
			const [, {deleteInput: {authorId, postId, commentId}}, { req }] = args

			const authorIdToken = getAuthorId(req)

			const isCommentOwner = await prisma.comment.findOne({
				where: {
					id: commentId
				},
				select: {
					postId
				}
			})

			if (!isCommentOwner)
				// eslint-disable-next-line no-var
				var isPostOwner = await prisma.post.findOne({
					where: {
						id: postId
					},
					select: {
						authorId
					}
				})

			if (!isCommentOwner || !isPostOwner || isPostOwner.authorId !== authorIdToken)
				throw new ForbiddenError(
					'Apenas o dono do comentário ou do post pode fazer essa ação'
				)

			return resolve.apply(this, args)
		}
	}
}

export default CommentOrPostOwnerDirective
