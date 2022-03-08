import React from 'react';
import useSWR from 'swr';

import { useUser } from '@hooks/useUser';
import SmallBlog from '@components/blog/smallBlog';
import fetcher from '@lib/blog';
import LandingBigBlog from '@components/blog/landingBlog/bigBlog';
import LandingSmallBlog from '@components/blog/landingBlog/smallBlog';

export default function Index() {
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
        />
        <LandingSmallBlog
          title={data[2].title}
          image={`https://avatar.tobi.sh/${data[1].title}`}
          description={data[2].description}
          id={data[2].id}
          deleteBlog={deleteBlog}
          user={user}
        />
      </div>
    </div>
  );

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-[24px] mt-[2rem]">LATEST BLOGS</h2>
      <div className="border-[3px] border-solid border-purple-500 w-[1000px] mb-[2rem]" />
      <div>{renderLandingBlogs()}</div>
      <div className="grid grid-cols-3 justify-items-center gap-x-[110px] gap-y-[4rem] mt-[4rem]">
        {renderSmallBlogs()}
      </div>
    </div>
  );
}

Index.auth = true;
