import express from 'express'
import { PrismaClient } from '@prisma/client'
import resolvers from './graphql/resolvers'
import path from 'path'
import { createServer } from 'http'
import { APOLLO_OPTIONS, HTTP_PORT } from './config/apollo'
import { pubsub } from './constants/subscriptions'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'
import dotenv from 'dotenv'

dotenv.config()

export const app = express()

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

app.use('/img', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(express.static(path.resolve(__dirname, './app/build')))

server.applyMiddleware({ app, path: '/graphql', cors: true })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: HTTP_PORT }, () => {
  console.log(`Apollo Server on http://localhost:${HTTP_PORT}/graphql`)
})
