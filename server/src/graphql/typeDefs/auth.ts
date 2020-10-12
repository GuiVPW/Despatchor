import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    checkAuth(token: String): Auth
  }

  type Auth {
    id: ID!
    email: String
    username: String
    token: String
  }

  type Token {
    id: ID!
    email: String
    username: String
    iat: Int
    exp: Int
  }
`
