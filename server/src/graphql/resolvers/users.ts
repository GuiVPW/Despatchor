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
import oauth2Client from '../../config/google-api'
import { config } from 'dotenv-safe'
import { EmailVerify, VerifyId } from '../../types/email'

config()

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
    createUser: async (
      _,
      { signupInput: { email, password, name, bio, avatarUrl } }
    ) => {
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

        await sendEmail({ ...user, reason: 'Confirmation' })

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
          const send = await sendEmail({ ...userEmail, reason: 'Confirmation' })
          if (!send) throw new AuthenticationError('Email não existe')
        }

        if (!(await bcrypt.compare(password, user.password)))
          throw new AuthenticationError('Senha incorreta')

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
          token,
          emailVerified: user.verifiedEmail
        }

        return jwtToken
      } catch (e) {
        throw new ValidationError('Não foi possível completar o Login')
      }
    },

    googleLogin: async (_, { idToken }) => {
      try {
        const login = await oauth2Client.verifyIdToken({
          idToken,
          audience: process.env.OAUTH2_CLIENTID
        })

        if (!login) throw new AuthenticationError('Login falhou')

        const { email_verified, email, picture, name } = login.getPayload()

        if (email_verified) {
          const user = await prisma.user.findOne({
            where: {
              email
            }
          })

          if (!user.verifiedEmail) {
            const userEmail = {
              id: user.id,
              name: user.name,
              email: user.email
            }
            const send = await sendEmail({
              ...userEmail,
              reason: 'Confirmation'
            })
            if (!send) throw new AuthenticationError('Email não existe')
          }

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
            token,
            emailVerified: user.verifiedEmail
          }

          return jwtToken
        } else {
          const password = email + process.env.SECRET

          const newUser = await prisma.user.create({
            data: {
              email,
              password: bcrypt.hashSync(password, 10),
              avatarUrl: picture,
              name,
              createdAt: new Date()
            }
          })

          if (!newUser)
            throw new ValidationError('Não foi possível criar um novo usuário')

          await sendEmail({ ...newUser, reason: 'Confirmation' })

          const payload = {
            email: newUser.email,
            avatarUrl: newUser.avatarUrl,
            name: newUser.name,
            bio: newUser.bio
          }

          return payload
        }
      } catch (e) {
        console.log(e)
        throw new AuthenticationError('Login falhou')
      }
    },

    verifyEmail: async (_, { verifyInput: { token, reason } }: EmailVerify) => {
      try {
        const tokenId = jwt.verify(
          token,
          reason === 'Confirmation'
            ? process.env.SECRET
            : process.env.RESET_SECRET
        )

        const id = (<VerifyId>tokenId).id

        if (!id)
          throw new ValidationError(
            'O tempo expirou ou esse token não é válido'
          )

        const isUser = await prisma.user.findOne({ where: { id } })

        if (isUser.verifiedEmail && reason === 'Confirmation')
          throw new ValidationError('Você já confirmou seu email')

        if (reason === 'Confirmation' && !isUser.verifiedEmail) {
          const user = await prisma.user.update({
            data: {
              verifiedEmail: true
            },
            where: {
              id
            }
          })
          return user.verifiedEmail
        } else {
          return true
        }
      } catch (e) {
        console.log(e)
        throw new ForbiddenError('Não foi possível confirmar o email')
      }
    },

    sendPasswordReset: async (_, { id }) => {
      try {
        const isUser = await prisma.user.findOne({
          where: { id }
        })

        if (!isUser) throw new ForbiddenError('Esse usuário não existe')

        await sendEmail({ ...isUser, reason: 'PasswordReset' })

        return true
      } catch (e) {
        console.log(e)
        throw new ValidationError('Não foi possível enviar o email de reset')
      }
    },

    resetPassword: async (
      _,
      { resetInput: { id, oldPassword, newPassword } }
    ) => {
      try {
        const isUser = await prisma.user.findOne({
          where: { id }
        })

        if (!isUser) throw new ForbiddenError('Esse usuário não existe')

        const bcryptedNewPassword = bcrypt.hashSync(newPassword, 10)

        if (!(await bcrypt.compare(oldPassword, isUser.password)))
          throw new AuthenticationError('Senha incorreta')

        if (await bcrypt.compare(newPassword, isUser.password))
          throw new ValidationError('Suas senhas não podem ser iguais!')

        const updatePassword = await prisma.user.update({
          where: {
            id
          },
          data: {
            password: bcryptedNewPassword
          }
        })

        if (!updatePassword)
          throw new ForbiddenError('Não foi possível alterar sua senha')

        return true
      } catch (e) {
        console.log(e)
        throw new ForbiddenError('Não foi possível alterar sua senha')
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
          where: { id },
          include: {
            comment: true,
            liked: true,
            posts: true
          }
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
