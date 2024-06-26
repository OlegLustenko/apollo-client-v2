'use client';

import React, { useTransition } from 'react';
import { Button } from 'components/ui/button';
import Link from 'next/link';
import { cn } from 'lib/utils';
import { LoadingSpinner } from 'components/ui/spinner';
import { useParams, useRouter } from 'next/navigation';
import { postsFeature } from 'features/Posts/@core/posts';
import { StarIcon, TrashIcon } from '@radix-ui/react-icons';

export const Posts = () => {
  const [deletedPost, setDeletedPost] = React.useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { posts, deletePost } = postsFeature.hooks.usePosts();
  const params = useParams() as { postId: string } | undefined;
  const router = useRouter();

  const filteredPosts =
    posts?.data?.filter((post) => !deletedPost.includes(post?.id as string)) ||
    [];

  const onDelete = (postId: string) => {
    if (!postId) {
      return;
    }

    startTransition(async () => {
      await deletePost({ variables: { id: postId } });
      setDeletedPost((deletedPosts) => {
        return [...deletedPosts, postId as string];
      });

      if (postId === params?.postId) {
        router.push('/posts');
      }
    });
  };

  return (
    <div className="relative pr-4">
      <ul className="flex flex-col gap-2">
        {filteredPosts.map((post) => {
          return (
            <Link
              href={`/posts/${post?.id}`}
              key={post?.id}
              prefetch
            >
              <li
                className={cn(
                  'hover:text-gray-9 flex flex-col border-b border-gray-200 p-4 hover:bg-gray-50',
                  {
                    'bg-blue-50 ring-2': params?.postId === post?.id,
                  },
                )}
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                      <h3 className="text-sm leading-6 text-gray-600">
                        Great post today!
                      </h3>
                      <div className="mt-1 flex flex-wrap text-lg italic">
                        <StarIcon
                          className="items-baseline text-4xl text-amber-500"
                          height={25}
                          width={25}
                        />
                        {post?.title}
                      </div>
                    </div>
                    <div className="ml-4 mt-4 flex flex-shrink-0 gap-4">
                      <Button
                        variant="outline"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onDelete(post?.id as string);
                        }}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <LoadingSpinner className={cn(isPending ? '' : 'hidden')} />
    </div>
  );
};
