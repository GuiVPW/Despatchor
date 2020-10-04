import jwt from 'jsonwebtoken'
import { prisma } from '../../index'
import authConfig from '../../config/auth.json'

const Query = {
  users: async () => prisma.user.findMany({ include: { profile: true } }),
  user: async (_, { id }) => {
    const user = await prisma.user.findOne({
      where: { id },
      include: { profile: true, posts: true }
    })
    return user
  },

  post: async (_, { id }) => {
    const post = await prisma.post.findOne({ where: { id } })
    return post
  },

  posts: async () => prisma.post.findMany(),

  checkAuth: async (_, { token }) => {
    try {
      if (token === '') {
        throw new Error('Nenhum token enviado.')
      }

      const verify = jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          throw new Error('Esse jwt não é válido.')
        } else {
          const token = jwt.sign(
            {
              id: decoded.id,
              email: decoded.email,
              username: decoded.username
            },
            authConfig.secret,
            {
              expiresIn: '86400'
            }
          )

          const jwtToken = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            token
          }

          return jwtToken
        }
      })

      return verify
    } catch (e) {
      throw new Error(e)
    }
  }
}
export default Query
