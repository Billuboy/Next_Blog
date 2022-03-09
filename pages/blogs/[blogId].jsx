import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';
import BigBlog from '@components/blog/bigBlog';
import fetcher from '@lib/blog';

export default function Blog() {
  const { token, data: user } = useUser();
  const router = useRouter();

  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}/items/${router.query.blogId}`;
  const { data, error } = useSWR([fetchURL, token], fetcher);

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    router.replace('/404');
  }

  return (
    <div className="h-full">
      {!error && (
        <BigBlog
          title={data.title}
          description={data.description}
          image={`https://avatar.tobi.sh/${data.title}`}
          user={user}
        />
      )}
    </div>
  );
}

Blog.auth = true;
