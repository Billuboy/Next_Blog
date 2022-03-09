import React from 'react';
import Image from 'next/image';

export default function bigBlog({ title, description, user, image }) {
  return (
    <div className="flex justify-between h-full">
      <div className="h-full w-3/4">
        <div className="flex items-center my-[2rem]">
          <Image
            src={user.avatar}
            width="50"
            height="50"
            layout="fixed"
            priority
            className="rounded-full"
          />
          <p className="font-bold text-[14px] ml-[0.75rem]">{user.fullName}</p>
        </div>

        <div className="font-bold text-[24px]">{title}</div>
        <div className="mt-[2rem] mb-[3rem]">
          <Image
            src={image}
            width="400px"
            height="300px"
            layout="fixed"
            priority
            className="rounded-[5px]"
          />
        </div>
        <pre className="font-medium text-[16px] whitespace-pre-line">
          {description}
        </pre>
      </div>
      <div className="w-[300px] grid place-items-center border border-solid border-gray-300">
        <h3 className="font-semibold text-[20px]">Space For Ads</h3>
      </div>
    </div>
  );
}
