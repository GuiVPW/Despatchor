import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { storeUpload } from '../../utils/storeUpload'
import { prisma } from '../../index'
import sendEmail from '../../utils/sendEmail'

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

        await sendEmail(user)

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

        if (!user) return new Error('Erro: email não encontrado!')

        if (!(await bcrypt.compare(password, user.password)))
          return new Error('Erro: senha incorreta!')

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

    verifyEmail: async (_, { id, code }) => {
      try {
        const user = await prisma.user.findOne({})
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
