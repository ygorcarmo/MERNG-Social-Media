const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post{
    id: ID
    body: String
    postImage: String
    comments: [Comment]
    likes:[Like]
    commentCount: Int
    likeCount:Int
    createdAt: String
    username: String
    user: User
  }

  type User{
    id: ID
    email: String
    username: String
    postCount: Int
    createdAt: String
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
    email: String
    password: String
    confirmPassword: String
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

    createPost(body: String, postImage: String): Post
    deletePost(postId: ID!): String
    updatePost(id: ID, body: String!): Post
    savedPost(input: savedPost): User
    likePost(postId: ID): Post

    createComment(postId: String, body: String): Post
    deleteComment(postId: ID, commentId: ID): Post
  }

  type Subscription{
    newPost: Post!
  }
`;

module.exports = typeDefs;
