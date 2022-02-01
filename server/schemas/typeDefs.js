const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post{
    id: ID
    title: String
    body: String
    comments: [Comment]
    likes:[Like]
    commentCount: Int
    likeCount:Int
    createdAt: String
    username: String    
  }
  type User{
    id: ID
    email: String
    password: String!
    token: String!
    username: String!
    postCount: Int
    createdAt: String!
  }

  type Comment {
    id: ID
    createdAt: String
    username: String
    body: String
  }

  type Like{
    id: ID
    createdAt: String
    username: String
  }
  
  input RegisterInput{
    username: String
    password: String
    confirmPassword: String
    email: String
  }

  input savedPost{
    postId: String
    title: String
    username: String
    body: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
 type Query {
    me: User
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation{
    register(registerInput: RegisterInput): Auth
    login(username: String!, password: String!): Auth

    createPost(body:String, title: String): Post
    deletePost(postId: ID!): User
    updatePost(id: ID, body: String!, title: String): Post
    savedPost(input: savedPost): User

    createComment(postId: String, body: String): Post
    deleteComment(postId: ID, comment: ID): Post
    likePost(postId: ID): Post
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
