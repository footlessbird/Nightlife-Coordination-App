const userResolvers = require('./user')
const placeResolvers = require('./place')

module.exports = {
    Bar: {
        goingCount(parent){
            // console.log(parent)
            return parent.goings.length
        }
    },
    Query: {
        ...userResolvers.Query,
        ...placeResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...placeResolvers.Mutation
    }
}