import React from 'react';
import { Post } from 'features/Posts/components/Post';

const Page = ({ params }: { params: { postId: string } }) => {
  return <Post params={params} />;
};

export default Page;
