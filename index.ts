import express from 'express'
import { PrismaClient } from '@prisma/client'
import resolvers from './src/graphql/resolvers'
import typeDefs from './src/graphql/typeDefs'
import path from 'path'
import { createServer } from 'http'
import { APOLLO_OPTIONS, HTTP_PORT } from './src/config/apollo'
import { pubsub } from './src/constants/subscriptions'
import { ApolloServer } from 'apollo-server-express'

const app = express()

export const prisma = new PrismaClient()

app.use((_req, _res, next) => {
  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    pubsub,
    prisma
  }),
  ...APOLLO_OPTIONS
})

app.use('/img', express.static(path.resolve(__dirname, 'uploads')))

// app.use(express.static(path.resolve(__dirname, 'static')))

// app.get('/*', (_req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// })

server.applyMiddleware({ app, path: '/graphql', cors: true })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: HTTP_PORT }, () => {
  console.log(`Apollo Server on http://localhost:${HTTP_PORT}/graphql`)
})
