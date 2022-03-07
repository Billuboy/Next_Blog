import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SmallBlog({ title, description, id, deleteBlog }) {
  const router = useRouter();

  return (
    <div>
      <Link href={`/blogs/${id}`}>{title}</Link>
      <div className="whitespace-pre">{description}</div>
      <button type="button" onClick={() => deleteBlog(id)}>
        Delete
      </button>
      <button type="button" onClick={() => router.push(`/blogs/update/${id}`)}>
        Edit
      </button>
    </div>
  );
}
