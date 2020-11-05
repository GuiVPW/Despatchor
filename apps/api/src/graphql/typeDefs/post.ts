import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		post(id: String): Post
		posts: [Post!]
	}

	extend type Mutation {
		createPost(creationInput: PostCreation!): Post @auth @accountOwner

		editPost(input: PostEdition!): Post @auth @postOwner

		addLike(input: AddLike): Int @auth

		removePost(input: PostRemove!): Boolean @auth @postOwner
	}

	extend type Subscription {
		postCreated: Post
		postLikes: Post
		postRemoved: Int
	}


	input PostCreation {
		authorId: String!
		title: String!
		description: String!
		imageUrl: Upload
	}

  input PostRemove {
    postId: String!
  }

	input PostEdition {
		id: String
		title: String
		description: String
	}

  input AddLike {
    id: String postId: String!
  }

	type Post {
		id: String
		title: String!
		description: String
		published: Boolean!
		authorId: String
		postImageUrl: String
		likes: Int!
		author: User!
		comment: [Comment]
		likers: [PostsLike]
		createdAt: DateTime!
	}

	type PostsLike {
		id: String
		post: Post!
		user: User!
		createdAt: DateTime!
	}
`
