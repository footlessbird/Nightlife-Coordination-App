const { gql } = require("apollo-server");

module.exports = gql`
  type Bar {
    id: String
    yelp_id: String
    name: String
    url: String
    rating: Float
    price: String
    image_url: String
    goings: [User]
    goingCount: Int
  }
  type User {
    id: ID!
    username: String!
    token: String!
    password: String!
  }
  type Query {
    getUsers: [User]
    getBars(location: String!): [Bar]
  }
  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
    go(yelp_id: String!): Int
  }
`;
