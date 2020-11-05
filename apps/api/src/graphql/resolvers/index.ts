import { DateTimeResolver as DateTime } from 'graphql-scalars'

import users from './users'
import posts from './posts'
import comments from './comments'

const resolvers = {
	...users,
	...posts,
	Query: {
		...users.Query,
		...posts.Query
	},
	Mutation: {
		...users.Mutation,
		...posts.Mutation,
		...comments.Mutation
	},
	Subscription: {
		...posts.Subscription,
		...comments.Subscription
	},
	DateTime
}

export default resolvers
