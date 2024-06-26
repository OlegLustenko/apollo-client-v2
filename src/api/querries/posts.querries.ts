import { gql } from 'gql';

export const GET_POST_QUERY = gql(/* GraphQL */ `
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`);

export const GET_POSTS_QUERY = gql(/* GraphQL */ `
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`);

export const GET_POSTS_QUERY_DEFAULT_OPTIONS = {
  variables: { options: { paginate: { page: 1, limit: 5 } } },
};

export const DELETE_POST_MUTATION = gql(/* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`);

export const UPDATE_POST_MUTATION = gql(/* GraphQL */ `
  mutation UpdatePostMutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`);
