import React, { Suspense } from 'react';
import { Posts } from 'features/Posts/Posts';
import Link from 'next/link';
import {
  GET_POSTS_QUERY,
  GET_POSTS_QUERY_DEFAULT_OPTIONS,
} from 'api/querries/posts.querries';
import { PreloadQuery } from 'app/ApolloClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid min-h-screen grid-cols-3 flex-col justify-between p-24">
      <div className="border-r-2 border-amber-200">
        <Link
          href="/posts"
          className="text-blue-800 hover:underline"
        >
          <h1 className="text-4xl">Posts</h1>
        </Link>
        <PreloadQuery
          query={GET_POSTS_QUERY}
          variables={GET_POSTS_QUERY_DEFAULT_OPTIONS.variables}
        >
          <Posts />
        </PreloadQuery>
      </div>
      <div className="col-span-2">
        <div className="m-auto flex w-full justify-center pl-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
