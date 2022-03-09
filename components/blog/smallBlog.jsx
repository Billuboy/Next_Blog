import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SmallBlog({
  title,
  description,
  id,
  deleteBlog,
  user,
  image,
  handleUpdateSubmit,
}) {
  return (
    <div className="w-[400px] h-[400px] border border-solid border-gray-200 rounded-[5px] grid place-items-center">
      <div className="w-[360px] h-[360px]">
        <div className="flex gap-[20px]">
          <Image
            src={image}
            width="120"
            height="120"
            layout="fixed"
            priority
            className="rounded-[5px]"
          />
          <div className="h-[120px] w-[210px] text-title">
            <Link href={`/blogs/${id}`}>{title}</Link>
          </div>
        </div>
        <div className="h-[130px] mt-[1rem] text-description">
          {description}
        </div>
        <div className="mt-[2rem]">
          <div className="flex items-center">
            <Image
              src={user.avatar}
              width="30"
              height="30"
              layout="fixed"
              priority
              className="rounded-full"
            />
            <p className="text-author">{user.fullName}</p>
          </div>
          <div className="flex justify-end gap-[1rem] mt-[0.5rem]">
            <button
              type="button"
              onClick={() => handleUpdateSubmit({ title, description, id })}
              className="button-edit"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => deleteBlog(id)}
              className="button-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
