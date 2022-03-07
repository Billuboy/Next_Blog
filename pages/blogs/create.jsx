import React from 'react';

import BlogForm from '@components/blog/blogForm';
import { useUser } from '@hooks/useUser';

export default function Create() {
  const { token } = useUser();

  const submitCallback = async (data) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: data,
    });
  };

  return (
    <div>
      <div>Create a blog</div>
      <BlogForm submitCallback={submitCallback} buttonText="Create Blog" />
    </div>
  );
}

Create.auth = true;
