import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		user(id: String): User! @auth
		users: [User!]
    verifyToken: User! @auth
	}

	extend type Mutation {
		createUser(signupInput: SignUp!): SignUpPayload
		login(loginInput: Login!): Auth
		verifyEmail(verifyInput: Verify!): Boolean
		deleteUser(id: String): String @auth
		googleLogin(tokenId: String!): Auth
		resetPassword(resetInput: resetPassword!): Boolean
		sendPasswordReset(id: String): Boolean
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
		id: String
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
		id: String
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
