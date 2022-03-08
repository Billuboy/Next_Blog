import React, { useState, useRef } from 'react';
import useSWR from 'swr';

import { useUser } from '@hooks/useUser';
import BlogModal from '@components/blog/blogForm';
import SmallBlog from '@components/blog/smallBlog';
import fetcher from '@lib/blog';
import LandingBigBlog from '@components/blog/landingBlog/bigBlog';
import LandingSmallBlog from '@components/blog/landingBlog/smallBlog';

export default function Index() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const globalData = useRef(null);
  const { token, data: user } = useUser();
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

  const renderSmallBlogs = () => {
    const remain = data.slice(3);
    return remain.map((val) => (
      <div key={val.id}>
        <SmallBlog
          title={val.title}
          image={`https://avatar.tobi.sh/${val.title}`}
          description={val.description}
          deleteBlog={deleteBlog}
          id={val.id}
          user={user}
          globalData={globalData}
          setOpen={setIsUpdateOpen}
        />
      </div>
    ));
  };

  const renderLandingBlogs = () => (
    <div className="flex justify-between h-[280px]">
      <div className="w-[600px] border border-gray-200 border-solid grid place-items-center rounded-[5px]">
        <LandingBigBlog
          title={data[0].title}
          image={`https://avatar.tobi.sh/${data[0].title}`}
          description={data[0].description}
          id={data[0].id}
          deleteBlog={deleteBlog}
          user={user}
          globalData={globalData}
          setOpen={setIsUpdateOpen}
        />
      </div>
      <div className="w-[600px] flex flex-col justify-between">
        <LandingSmallBlog
          title={data[1].title}
          image={`https://avatar.tobi.sh/${data[1].title}`}
          description={data[1].description}
          id={data[1].id}
          deleteBlog={deleteBlog}
          user={user}
          globalData={globalData}
          setOpen={setIsUpdateOpen}
        />
        <LandingSmallBlog
          title={data[2].title}
          image={`https://avatar.tobi.sh/${data[1].title}`}
          description={data[2].description}
          id={data[2].id}
          deleteBlog={deleteBlog}
          user={user}
          globalData={globalData}
          setOpen={setIsUpdateOpen}
        />
      </div>
    </div>
  );

  if (!data && !error) {
    return <div>Loading...</div>;
  }
  console.log('globalData', globalData.current);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-[24px] mt-[2rem]">LATEST BLOGS</h2>
          <div className="border-[3px] border-solid border-purple-500 w-[1000px] mb-[2rem]" />
        </div>
        <div className="w-[160px] h-[40px] bg-purple-500 rounded-[5px] grid place-items-center mt-[1.5rem]">
          <button
            type="button"
            className="font-semibold text-[18px]"
            onClick={() => setIsCreateOpen(true)}
          >
            Create a Blog
          </button>
        </div>
      </div>
      <BlogModal
        buttonText="Create Blog"
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      />
      {globalData && (
        <BlogModal
          buttonText="Update Blog"
          globalData={globalData.current}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
        />
      )}

      <div>{renderLandingBlogs()}</div>
      <div className="grid grid-cols-3 justify-items-center gap-x-[110px] gap-y-[4rem] mt-[4rem]">
        {renderSmallBlogs()}
      </div>
    </div>
  );
}

Index.auth = true;
