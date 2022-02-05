import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        email
        username
        createdAt
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      token
      user {
        id
        email
        username
        createdAt
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
