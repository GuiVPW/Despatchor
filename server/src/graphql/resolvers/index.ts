import { DateTimeResolver as DateTime } from 'graphql-scalars'

import users from './users'
import posts from './posts'
import auth from './auth'

const resolvers = {
  ...users,
  ...posts,
  ...auth,
  Query: {
    ...users.Query,
    ...posts.Query,
    ...auth.Query
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
