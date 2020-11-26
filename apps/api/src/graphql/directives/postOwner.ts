import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { prisma } from '../../main'
import getAuthorId from './utils/getAuthorId'

class PostOwnerDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async (...args) => {
			const [
				,
				{
					input: { postId }
				},
				{ req }
			] = args

			const authorId = getAuthorId(req)

			const exists = await prisma.post.findOne({
				where: {
					id: postId
				},
				select: {
					authorId: true
				}
			})

			if (!authorId || !exists || exists.authorId !== authorId)
				throw new ForbiddenError('Apenas o dono do post pode fazer essa ação')

			return resolve.apply(this, args)
		}
	}
}

export default PostOwnerDirective
