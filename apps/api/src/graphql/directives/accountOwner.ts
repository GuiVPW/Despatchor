import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import getAuthorId from './utils/getAuthorId'

class AccountOwner extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		field.resolve = async (...args) => {
			const [
				,
				{
					creationInput: { authorId }
				},
				{ req }
			] = args

			const jwtAuthorId = getAuthorId(req)

			if (jwtAuthorId !== authorId || !jwtAuthorId)
				throw new ForbiddenError('Apenas o dono da conta pode fazer essa ação')

			return resolve.apply(this, args)
		}
	}
}

export default AccountOwner
