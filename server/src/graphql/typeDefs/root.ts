import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime
  scalar EmailAddress
  scalar JSON

  directive @auth on FIELD_DEFINITION
  directive @postOwner(creator: Boolean = false) on FIELD_DEFINITION

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`
