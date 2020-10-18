import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { storeUpload } from '../../utils/storeUpload'
import { prisma } from '../../../index'
import sendEmail from '../../config/emailTransporter'
import {
  AuthenticationError,
  ForbiddenError,
  ValidationError
} from 'apollo-server-express'

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
      const { email, password, name, bio, avatarUrl } = signupInput
      try {
        if (
          await prisma.user.findOne({
            where: { email }
          })
        ) {
          throw new ValidationError('Erro: email já utilizado.')
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
            avatarUrl: path,
            name,
            bio
          }
        })

        await sendEmail(user)

        const payload = {
          email: user.email,
          avatarUrl: user.avatarUrl,
          name: user.name,
          bio: user.bio
        }

        return payload
      } catch (e) {
        console.log(e)
        throw new ValidationError('Não foi possível criar um usuário')
      }
    },

    login: async (_, { loginInput: { email, password } }) => {
      try {
        const user = await prisma.user.findOne({
          where: {
            email
          }
        })

        if (!user) throw new AuthenticationError('Usuário não existe')

        if (user && !user.verifiedEmail) {
          const userEmail = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          const send = await sendEmail(userEmail)
          if (!send) throw new AuthenticationError('Email não existe')
        }

        if (!(await bcrypt.compare(password, user.password)))
          throw new AuthenticationError('Senha inocrreta')

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            image: user.avatarUrl
          },
          process.env.SECRET,
          {
            expiresIn: '7d'
          }
        )

        const jwtToken = {
          id: user.id,
          email: user.email,
          image: user.avatarUrl,
          token
        }

        return { jwtToken, email: user.verifiedEmail }
      } catch (e) {
        throw new ValidationError('Não foi possível completar o Login')
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
        console.log(e)
        throw new ForbiddenError('Não foi possível confirmar o email')
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
        if (!user)
          throw new ValidationError('Não foi possível excluir o usuário!')
        return 'Usuário deletado com sucesso!'
      } catch (e) {
        console.log(e)
        throw new ForbiddenError('Não foi possível deletar o usuário')
      }
    }
  }
}

export default resolvers
