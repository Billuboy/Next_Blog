import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';
import BigBlog from '@components/blog/bigBlog';
import fetcher from '@lib/blog';

export default function Blog() {
  const { token } = useUser();
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
    <div>
      {!error && <BigBlog title={data.title} description={data.description} />}
    </div>
  );
}

Blog.auth = true;
