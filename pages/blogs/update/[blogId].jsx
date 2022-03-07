import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';
import BlogForm from '@components/blog/blogForm';

export default function Update() {
  const { token } = useUser();
  const router = useRouter();
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/${router.query.blogId}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) router.replace('/404');
      const json = await response.json();
      setGlobalData(json);
      setLoading(false);
    })();
  }, []);

  const submitCallback = async (data) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${router.query.blogId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: data,
      }
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Update Blog</div>
      <BlogForm
        submitCallback={submitCallback}
        globalData={globalData}
        buttonText="Update Blog"
      />
    </div>
  );
}

Update.auth = true;
