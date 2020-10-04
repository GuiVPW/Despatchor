import {
  POST_CREATED,
  POST_LIKES,
  POST_REMOVED,
  pubsub
} from '../../constants/subscriptions'
import Query from './queries'
import Mutation from './mutations'

const resolvers = {
  Query,
  Mutation,
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(POST_CREATED)
    },
    postLikes: {
      subscribe: () => pubsub.asyncIterator(POST_LIKES)
    },
    postRemoved: {
      subscribe: () => pubsub.asyncIterator(POST_REMOVED)
    }
  }
}

export default resolvers
