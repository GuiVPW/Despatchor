import { DateTimeResolver as DateTime } from 'graphql-scalars'

import users from './users'
import posts from './posts'

const resolvers = {
  ...users,
  ...posts,
  Query: {
    ...users.Query,
    ...posts.Query
  },
  Mutation: {
    ...users.Mutation,
    ...posts.Mutation
  },
  Subscription: {
    ...posts.Subscription
  },
  DateTime
}

export default resolvers
