import React, { useState } from 'react';

import BlogForm from '@components/blog/blogForm';
import { useUser } from '@hooks/useUser';

export default function Create() {
  const { token } = useUser();
  const [isOpen, setIsOpen] = useState(true);

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
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      <BlogForm
        submitCallback={submitCallback}
        buttonText="Create Blog"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

Create.auth = true;
