import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    post(id: Int!): Post
    posts: [Post!]
  }

  extend type Mutation {
    createPost(creationInput: PostCreation!): Post @auth

    editPost(editionInput: PostEdition): Post @auth @postOwner

    addLike(id: Int!, postId: Int!): Int @auth

    removePost(postId: Int!): Boolean @auth @postOwner
  }

  extend type Subscription {
    postCreated: Post
    postLikes: Post
    postRemoved: Int
  }

  input PostCreation {
    id: Int!
    title: String!
    description: String!
    imageUrl: Upload
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
    authorId: Int
    postImageUrl: String
    likes: Int!
    author: User!
    comment: [Comment]
    likers: [PostsLike]
    createdAt: DateTime!
  }

  type PostsLike {
    id: ID!
    post: Post!
    user: User!
    createdAt: DateTime!
  }
`
