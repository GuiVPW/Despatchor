import express from 'express'
import { PrismaClient } from '@prisma/client'
import resolvers from './src/graphql/resolvers'
import path from 'path'
import { createServer } from 'http'
import { APOLLO_OPTIONS, HTTP_PORT } from './src/config/apollo'
import { pubsub } from './src/constants/subscriptions'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './src/graphql/typeDefs'
import dotenv from 'dotenv-safe'
import schemaDirectives from './src/graphql/directives'

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
    pubsub
  }),
  schemaDirectives,
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
