import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import jwt from 'jsonwebtoken'
import { prisma } from '../..'

const getAuthorId = req => {
  const Authorization = req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const tokenObject = jwt.decode(token)
    if (typeof tokenObject === 'object') return tokenObject.id
  }

  throw new Error('Not authenticated')
}

class PostOwnerDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.author = this.args.author
    field.resolve = async (...args) => {
      const [, { postId }, { req }] = args
      const authorId = getAuthorId(req)

      const exists = await prisma.post.findOne({
        where: {
          id: postId
        },
        select: {
          authorId
        }
      })

      if (field.author && !exists)
        throw new ForbiddenError('Apenas o dono do post pode fazer essa ação')

      return resolve.apply(this, args)
    }
  }
}

export default PostOwnerDirective
