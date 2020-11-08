import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import * as jwt from 'jsonwebtoken'

class AuthDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: any) {
		const { resolve = defaultFieldResolver } = field

		field.resolve = async (...args) => {
			const [, , context] = args
			const Authorization = context.req.get('Authorization')

			if (Authorization) {
				const token = Authorization.replace('Bearer ', '')
				const verify = jwt.verify(token, process.env.SECRET)
				if (!verify) throw new AuthenticationError('Você deve estar logado')
				return resolve.apply(this, args)
			} else throw new AuthenticationError('Nenhum token enviado')
		}
	}
}

export default AuthDirective
