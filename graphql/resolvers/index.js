const userResolvers = require('./user')
const placeResolvers = require('./place')

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...placeResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}