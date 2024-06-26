import { useMutation, useSuspenseQuery } from '@apollo/client';
import {
  DELETE_POST_MUTATION,
  GET_POST_QUERY,
  GET_POSTS_QUERY,
  GET_POSTS_QUERY_DEFAULT_OPTIONS,
} from 'api/querries/posts.querries';

export const usePosts = () => {
  const {
    data: { posts },
  } = useSuspenseQuery(GET_POSTS_QUERY, GET_POSTS_QUERY_DEFAULT_OPTIONS);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    refetchQueries: [GET_POSTS_QUERY, 'GetPosts'],
  });

  return {
    posts,
    deletePost,
  };
};
