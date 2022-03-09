/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import { useUser } from '@hooks/useUser';

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, auth, data } = useUser();

  const dropdown = () => (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="h-[60px] w-[60px] flex items-center justify-center">
        <Image
          src={data.avatar}
          width="40"
          height="40"
          layout="fixed"
          priority
          className="rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        />
        <ChevronDownIcon className="w-[20px] h-[20px] text-purple-500" />
      </Menu.Button>
      <Menu.Items>
        <div className="absolute right-0 z-10 h-[180px] w-[175px] mt-[1rem] border-gray-200 border-solid border rounded-[10px] flex flex-col justify-evenly items-center bg-white-basic">
          <Menu.Item>
            <>
              <p className="font-bold text-purple-500 text-[1.2rem]">
                {data.fullName}
              </p>
              <div className="border-b-gray-200 border-b-solid border-b w-full" />
            </>
          </Menu.Item>
          <Menu.Item>
            <p className="font-regular text-[1.2rem] cursor-pointer">
              <Link href="/dashboard">Settings</Link>
            </p>
          </Menu.Item>
          <Menu.Item>
            <>
              <div className="border-gray-200 border-solid border w-full" />
              <p
                className="font-bold text-[1.2rem] text-red-danger cursor-pointer"
                onClick={logout}
              >
                Logout
              </p>
            </>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );

  return (
    <div className="w-full h-[72px] flex justify-center bg-white-basic sticky top-0 z-10">
      <div className="w-[1437px] flex justify-between items-center">
        <h3 className="font-black text-purple-500 text-[36px] leading-[42px] tracking-[0.075em]">
          <Link href="/">Blogs</Link>
        </h3>
        {auth ? (
          <div className="flex">{dropdown()}</div>
        ) : (
          <div className="flex gap-[2rem]">
            <div className="button-auth border border-solid border-purple-500">
              <Link href="/auth?type=sign-in">Sign-In</Link>
            </div>
            <div className="button-auth bg-purple-500 text-white-basic">
              <Link href="/auth?type=sign-up">Sign-Up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
