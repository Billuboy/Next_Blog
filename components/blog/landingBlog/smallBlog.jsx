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
    <div className="container-landing-small">
      <div className="w-[572px] h-[110px] flex gap-[30px]">
        <div className="w-[110px]">
          <Image
            src={image}
            width="110"
            height="110"
            layout="fixed"
            priority
            className="rounded-[5px]"
          />
        </div>
        <div className="w-[432px]">
          <div className="text-title h-[27px]">
            <Link href={`/blzogs/${id}`}>{title}</Link>
          </div>
          <div className="text-description h-[46px] line-clamp-2 truncate">
            {description}
          </div>
          <div className="flex justify-between">
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
            <div className="flex gap-[1rem]">
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
    </div>
  );
}
