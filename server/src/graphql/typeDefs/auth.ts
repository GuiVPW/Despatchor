import { gql } from 'apollo-server-express'

export default gql`
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
