import React from 'react';
import Link from 'next/link';

import { useUser } from '@hooks/useUser';

export default function Header() {
  const { logout, auth } = useUser();

  return (
    <div>
      <Link href="/">Blogs</Link>
      {auth ? (
        <div role="button" onClick={logout} tabIndex="0">
          Logout
        </div>
      ) : (
        <Link href="/auth">Get Started</Link>
      )}
    </div>
  );
}
