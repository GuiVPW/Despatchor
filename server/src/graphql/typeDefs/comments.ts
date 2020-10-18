import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createComment(creationInput: CommentCreation!): Comment @auth
    removeComment(deleteInput: CommentDeletion!): Boolean
    @auth
    @commentOrPostOwner
  }

  extend type Subscription {
    commentCreated: Comment
    commentRemoved: Int
  }

  input CommentCreation {
    authorId: Int!
    postId: Int!
    comment: String!
  }

  input CommentDeletion {
    commentId: Int!
    authorId: Int!
  }

  type Comment {
    id: ID!
    author: User!
    comment: String
    createdAt: DateTime!
  }
`
