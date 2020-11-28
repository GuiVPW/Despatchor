moduel.exports = {
  client: {
    service: {
      name: 'despatchor-api',
      url: 'http://localhost:4000/graphql',
    },
    exclude: ["**/tests", "node_modules"]
  }
}
