export const { HTTP_PORT = 5000, NODE_ENV = 'development' } = process.env

export const IN_PROD = NODE_ENV === 'production'

export const APOLLO_OPTIONS = {
  playground: IN_PROD
    ? false
    : {
        settings: {
          'request.credentials': 'include'
        }
      }
}
