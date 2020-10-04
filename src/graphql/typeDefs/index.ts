import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    name: String
    posts: [Post]
    profile: Profile
    avatarUrl: Upload
    comments: [Comment]
  }

  type Profile {
    bio: String
  }

  type Post {
    id: ID!
    title: String!
    description: String
    likes: Int!
    published: Boolean!
    imageUrl: Upload
    comments: [Comment]
    createdAt: String
  }

  type Auth {
    id: ID!
    email: String
    username: String
    token: String
  }

  type Comment {
    author: User!
    createdAt: String
    comment: String!
    post: Post
  }

  type Token {
    id: ID!
    email: String
    username: String
    iat: Int
    exp: Int
  }

  type Query {
    user(id: Int!): User
    users: [User!]
    post(id: Int!): Post
    posts: [Post!]
    checkAuth(token: String): Auth
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      name: String
      username: String!
      bio: String
      avatarUrl: Upload
    ): User

    deleteUser(id: Int!): String

    login(email: String!, password: String!): Auth

    createPost(
      id: Int!
      title: String!
      description: String!
      imageUrl: Upload
    ): Post

    editPost(id: Int!, title: String!, description: String!): Post

    addLike(id: Int!, postId: Int!): Int
    removeLike(id: Int!): Int

    removePost(id: Int!): String
  }

  type Subscription {
    postCreated: Post
    postLikes: Post
    postRemoved: Post
  }
`

export default typeDefs
