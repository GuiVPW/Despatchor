import { Request } from 'express'
import jwt from 'jsonwebtoken'

const getAuthorId = (req: Request): void | string => {
	const Authorization = req.get('Authorization')
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const tokenObject = jwt.decode(token)
		if (typeof tokenObject === 'object') {
			return tokenObject.id
		}
	}

	throw new Error('Não está authenticado')
}

export default getAuthorId
