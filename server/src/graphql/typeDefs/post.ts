import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    post(id: Int!): Post
    posts: [Post!]
  }

  extend type Mutation {
    createPost(creationInput: PostCreation!): Post @auth

    editPost(editionInput: PostEdition): Post @auth @postOwner(creator: true)

    addLike(id: Int!, postId: Int!): Int @auth

    removeLike(id: Int!): Int @auth

    removePost(id: Int!): Boolean @auth @postOwner(creator: true)
  }

  extend type Subscription {
    postCreated: Post @auth
    postLikes: Post @auth
    postRemoved: Post @auth
  }

  input PostCreation {
    id: Int!
    title: String!
    description: String!
    imageUrl: Upload!
  }

  input PostEdition {
    id: Int!
    title: String
    description: String
  }

  type Post {
    id: ID!
    title: String!
    description: String
    published: Boolean!
    imageUrl: String!
    author: User!
    comments: [Comment]
    likes: Int!
    likers: [PostsLike]
    createdAt: DateTime!
  }

  type PostsLike {
    id: ID!
    post: Post!
    user: User!
  }

  type Comment {
    id: ID!
    author: User!
    comment: String
    createdAt: DateTime!
  }
`
