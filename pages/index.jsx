import React, { useState } from 'react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

import { useUser } from '@hooks/useUser';
import fetcher from '@lib/blog';
import LandingBigBlog from '@components/blog/landingBlog/bigBlog';
import LandingSmallBlog from '@components/blog/landingBlog/smallBlog';
import { jsonStringify } from '@lib/json';
import idGenerator from '@lib/stringGenerator';

const BlogModal = dynamic(() => import('@components/blog/blogModal'));
const SmallBlog = dynamic(() => import('@components/blog/smallBlog'));

export default function Index() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [globalData, setGlobalData] = useState(null);
  const { token, data: user } = useUser();
  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}/items/`;

  const { data, error, mutate } = useSWR([fetchURL, token], fetcher);

  const deleteBlog = async (id) => {
    const deleteURL = `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`;

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete it?')) {
      const result = data.filter((blog) => blog.id !== id);
      mutate(result, false);
      await fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    } else mutate(data);
  };

  const createBlog = async (body) => {
    const blog = { ...body, owner_id: user.id };
    mutate([...data, blog], false);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: jsonStringify(body),
    });
    mutate([...data, body]);
  };

  const updateBlog = async (body) => {
    const index = data.findIndex((val) => val.id === body.id);
    data[index].title = body.title;
    data[index].description = body.description;
    mutate(data, false);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${body.id}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: jsonStringify(body),
    });
  };

  const handleUpdateSubmit = (postData) => {
    setGlobalData(postData);
    setIsUpdateOpen(true);
  };

  const renderSmallBlogs = () => {
    const remain = data.slice(3);
    return remain.map((val) => (
      <div key={val?.id || idGenerator()}>
        <SmallBlog
          title={val.title}
          image={`https://avatar.tobi.sh/${val.title}`}
          description={val.description}
          deleteBlog={deleteBlog}
          id={val.id}
          user={user}
          handleUpdateSubmit={handleUpdateSubmit}
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
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
      <div className="w-[600px] flex flex-col justify-between">
        {data[1] ? (
          <LandingSmallBlog
            title={data[1].title}
            image={`https://avatar.tobi.sh/${data[1].title}`}
            description={data[1].description}
            id={data[1].id}
            deleteBlog={deleteBlog}
            user={user}
            handleUpdateSubmit={handleUpdateSubmit}
          />
        ) : null}
        {data[2] ? (
          <LandingSmallBlog
            title={data[2].title}
            image={`https://avatar.tobi.sh/${data[2].title}`}
            description={data[2].description}
            id={data[2].id}
            deleteBlog={deleteBlog}
            user={user}
            handleUpdateSubmit={handleUpdateSubmit}
          />
        ) : null}
      </div>
    </div>
  );

  const renderBlogs = () => {
    if (!data.length)
      return (
        <div className="h-[calc(100vh-178px)] w-full grid place-items-center">
          <div className="text-center">
            <h2 className="font-bold text-[24px]">No blogs available</h2>
            <p className="font-semibold text-[20px]">
              Click on Create to create a blog
            </p>
          </div>
        </div>
      );

    if (data.length <= 3) return <div>{renderLandingBlogs()}</div>;
    return (
      <>
        <div>{renderLandingBlogs()}</div>
        <div className="grid grid-cols-3 justify-items-center gap-x-[110px] gap-y-[4rem] mt-[4rem]">
          {renderSmallBlogs()}
        </div>
      </>
    );
  };

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  console.log(data);

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
            className="font-semibold text-[18px] text-white-basic"
            onClick={() => setIsCreateOpen(true)}
          >
            Create a Blog
          </button>
        </div>
      </div>
      <BlogModal
        buttonText="Create Blog"
        submitCallback={createBlog}
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      />
      {globalData && (
        <BlogModal
          buttonText="Update Blog"
          globalData={globalData}
          submitCallback={updateBlog}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
          setGlobalData={setGlobalData}
        />
      )}
      <div>{renderBlogs()}</div>
    </div>
  );
}

Index.auth = true;
