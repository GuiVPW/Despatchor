import jwt from 'jsonwebtoken'

const resolvers = {
  Query: {
    checkAuth: async (_, { token }) => {
      try {
        if (token === '') {
          throw new Error('Nenhum token enviado.')
        }

        const verify = jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            throw new Error('Esse jwt não é válido.')
          } else {
            const token = jwt.sign(
              {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username
              },
              process.env.SECRET,
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
}

export default resolvers
