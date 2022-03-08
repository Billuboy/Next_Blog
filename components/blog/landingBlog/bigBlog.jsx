import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SmallBlog({
  title,
  description,
  id,
  deleteBlog,
  image,
  user,
  setOpen,
  globalData,
}) {
  const handleEdit = () => {
    // eslint-disable-next-line no-param-reassign
    globalData.current = { title, description, id };
    setOpen(true);
  };

  return (
    <div className="h-[232px] w-[537px] flex gap-[30px]">
      <div className="w-[232px]">
        <Image
          src={image}
          width="232"
          height="232"
          layout="fixed"
          priority
          className="rounded-[5px]"
        />
      </div>
      <div className="w-[275px]">
        <div className="text-title mb-[1rem]">
          <Link href={`/blogs/${id}`}>{title}</Link>
        </div>
        <div className="text-description h-[100px]">{description}</div>
        <div className="mt-[1rem]">
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
              onClick={() => handleEdit()}
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
