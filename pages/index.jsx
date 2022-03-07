import React from 'react';

import { useUser } from '@hooks/useUser';

export default function Index() {
  const user = useUser();
  console.log(user);
  return <div className="font-black">Index</div>;
}
