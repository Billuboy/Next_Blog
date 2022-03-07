import React from 'react';
import useSWR from 'swr';

import { useUser } from '@hooks/useUser';
import SmallBlog from '@components/blog/smallBlog';
import fetcher from '@lib/blog';

export default function Index() {
  const { token } = useUser();
  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}/items/`;

  const { data, error, mutate } = useSWR([fetchURL, token], fetcher);

  const deleteBlog = async (id) => {
    const deleteURL = `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`;

    const result = data.filter((blog) => blog.id !== id);
    mutate(result, false);
    await fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    mutate(result);
  };

  const renderBlogs = () =>
    data.map((val) => (
      <div key={val.id}>
        <SmallBlog
          title={val.title}
          description={val.description}
          deleteBlog={deleteBlog}
          id={val.id}
        />
      </div>
    ));

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  return <div>{renderBlogs()}</div>;
}

Index.auth = true;
