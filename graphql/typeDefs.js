const { gql } = require("apollo-server");

module.exports = gql`
  type Bar {
    id: String
    name: String
    url: String
    rating: Float
    price: String
    image_url: String
  }
  type User {
    id: ID!
    username: String!
    # 비밀번호를 리턴하고 싶지 않다면 선언할 필요가 없다
    password: String!
  }
  type Query {
    getUsers: [User]
    getBars(location: String!): [Bar]
  }
  type Mutation {
    register(username: String!, password: String!): User!
  }
`;
