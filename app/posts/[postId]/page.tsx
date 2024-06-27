import React from 'react';
import { Post } from 'features/Posts/components/Post';
import { GET_POST_QUERY } from 'api/querries/posts.querries';
import { PreloadQuery } from 'app/ApolloClient';

const Page = ({ params }: { params: { postId: string } }) => {
  return (
    <PreloadQuery
      query={GET_POST_QUERY}
      variables={{ id: params.postId }}
    >
      <Post params={params} />
    </PreloadQuery>
  );
};

export default Page;
