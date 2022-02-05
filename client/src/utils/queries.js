import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  {
    getPosts {
      id
      username
      body
      postImage
      createdAt
      user {
        id
        username
        email
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      postImage
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
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      username
      email
    }
  }
`;
