import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      user {
        id
        username
        email
      }
      commentCount  
      comments{
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        createdAt
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost (postId: $postId) {
      id
      username
      body
      createdAt
      user {
        id
        username
        email
      }
      commentCount  
      comments{
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
