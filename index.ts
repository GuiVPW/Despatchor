import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import resolvers from './src/graphql/resolvers'

export const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: path.resolve(
    __dirname,
    '/src/graphql/typeDefs/typeDefs.Schema.graphql'
  ),
  resolvers,
  cors: {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['POST']
  }
})

server.listen(process.env.port || 4000, ({ url }) => {
  console.log(`Servidor rodando na porta: ${url}`)
})
