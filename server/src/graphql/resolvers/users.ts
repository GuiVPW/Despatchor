import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { storeUpload } from '../../utils/storeUpload'
import { prisma } from '../../index'
import sendEmail from '../../config/emailTransporter'

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await prisma.user.findOne({
        where: { id },
        include: { posts: true }
      })
      return user
    },
    users: async (_, {}) => prisma.user.findMany()
  },
  Mutation: {
    createUser: async (_, { signupInput }) => {
      const { email, password, name, username, bio, avatarUrl } = signupInput
      try {
        if (
          await prisma.user.findOne({
            where: { email }
          })
        ) {
          throw new Error('Erro: email já utilizado.')
        }

        if (avatarUrl) {
          const { createReadStream, filename } = await avatarUrl
          const stream = createReadStream()
          var { path } = await storeUpload({
            stream,
            filename,
            id: avatarUrl.id,
            folder: 'users'
          })
        }
        const user = await prisma.user.create({
          data: {
            email,
            password: bcrypt.hashSync(password, 10),
            username,
            avatarUrl: path,
            name,
            bio
          }
        })

        const emailSender = await sendEmail(user)

        const payload = {
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
          name: user.name,
          bio: user.bio
        }

        return payload
      } catch (e) {
        console.log(e)
        return e
      }
    },

    login: async (_, { loginInput }) => {
      const { email, password } = loginInput
      try {
        const user = await prisma.user.findOne({
          where: {
            email
          }
        })

        if (!user) return null

        if (user && !user.verifiedEmail) {
          const userEmail = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          const send = await sendEmail(userEmail)
          if (!send) throw new Error('Email falhou')
          return null
        }

        if (!(await bcrypt.compare(password, user.password))) return null

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
            image: user.avatarUrl
          },
          process.env.SECRET,
          {
            expiresIn: '86400'
          }
        )

        const jwtToken = {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.avatarUrl,
          token
        }

        return jwtToken
      } catch (e) {
        return e
      }
    },

    verifyEmail: async (_, { id }) => {
      try {
        const isUser = await prisma.user.findOne({ where: { id } })
        if (!isUser || isUser.verifiedEmail) return null

        const user = await prisma.user.update({
          data: {
            verifiedEmail: true
          },
          where: {
            id
          }
        })

        return user.verifiedEmail
      } catch (e) {
        return e
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const user = await prisma.user.findOne({
          where: { id },
          include: { posts: true }
        })
        if (user.posts.length !== 0) await prisma.post.delete({ where: { id } })

        const userDelete = await prisma.user.delete({
          where: { id }
        })
        if (!user) throw new Error('Não foi possível excluir o usuário!')
        return 'Usuário deletado com sucesso!'
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

export default resolvers
