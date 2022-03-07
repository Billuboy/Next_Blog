import React from 'react';

export default function bigBlog({ title, description }) {
  return (
    <div>
      <div>{title}</div>
      <div className="whitespace-pre">{description}</div>
    </div>
  );
}
