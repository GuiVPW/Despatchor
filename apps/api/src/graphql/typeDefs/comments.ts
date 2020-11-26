import { gql } from 'apollo-server-express'

export default gql`
	extend type Mutation {
		createComment(input: CommentCreation!): Comment @auth
		removeComment(input: CommentDeletion!): Boolean @auth @commentOrPostOwner
	}

	extend type Subscription {
		commentCreated: Comment
		commentRemoved: Int
	}

	input CommentCreation {
		authorId: String!
		postId: String!
		comment: String!
	}

	input CommentDeletion {
		commentId: String!
		postId: String!
		authorId: String!
	}

	type Comment {
		id: String
		author: User!
		comment: String
		createdAt: DateTime!
	}
`
