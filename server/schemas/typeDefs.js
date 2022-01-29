const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User{
    id: ID!
    email: String!
    password: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  
 type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body:String!): Post!
    deletePost(postId: ID!): String!
  }
`;

// stuff that I will need later
// type Tech {
//   _id: ID!
//   name: String!
// }

// type Matchup {
//   _id: ID!
//   tech1: String!
//   tech2: String!
//   tech1_votes: Int
//   tech2_votes: Int
// }

// type Query {
//   tech: [Tech]
//   matchups(_id: String): [Matchup]
// }

// type Mutation {
//   createMatchup(tech1: String!, tech2: String!): Matchup
//   createVote(_id: String!, techNum: Int!): Matchup
// }

module.exports = typeDefs;
