import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		user(id: Int!): User! @auth
		users: [User!]
	}

	extend type Mutation {
		createUser(signupInput: SignUp!): SignUpPayload
		login(loginInput: Login!): Auth
		verifyEmail(verifyInput: Verify!): Boolean
		deleteUser(id: Int!): String @auth
		googleLogin(tokenId: String!): Auth
		resetPassword(resetInput: resetPassword!): Boolean
		sendPasswordReset(id: Int!): Boolean
	}

	input Verify {
		token: String!
		reason: EmailType!
	}

	input SignUp {
		email: String!
		password: String!
		name: String!
		bio: String
		avatarUrl: Upload
	}

	input resetPassword {
		id: Int!
		oldPassword: String!
		newPassword: String!
	}

	enum EmailType {
		Confirmation
		PasswordReset
	}

	type SignUpPayload {
		email: String!
		avatarUrl: String
		name: String
		bio: String
	}

	input Login {
		email: String!
		password: String!
	}

	type User {
		id: ID!
		email: String!
		name: String
		avatarUrl: String
		bio: String
		posts: [Post]
		comments: [Comment]
		verifiedEmail: Boolean!
		createdAt: DateTime!
	}
`
