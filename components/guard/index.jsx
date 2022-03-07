/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';

export function AuthGuard({ children }) {
  const { auth } = useUser();
  const router = useRouter();

  if (auth) return <>{children}</>;
  router.replace('/auth');
  return null;
}

export function LoginGuard({ children }) {
  const { auth } = useUser();
  const router = useRouter();

  if (!auth) return <>{children}</>;
  router.replace('/');
  return null;
}
