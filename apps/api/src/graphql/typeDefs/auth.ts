import { gql } from 'apollo-server-express'

export default gql`
	type Auth {
		id: String
		email: String
		token: String
		emailVerified: Boolean
	}

	type Token {
		id: String
		email: String
		iat: Int
		exp: Int
	}
`
