import { PubSub } from 'apollo-server-express'

export const pubsub = new PubSub()

export const POST_CREATED = 'POST_CREATED'
export const POST_EDITED = 'POST_EDITED'
export const POST_LIKES = 'POST_LIKES'
export const POST_REMOVED = 'POST_REMOVED'
