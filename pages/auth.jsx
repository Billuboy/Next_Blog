import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Login = dynamic(() => import('@components/auth/login'));

const Register = dynamic(() => import('@components/auth/register'));

export default function Auth() {
  const [authType, setAuthType] = useState(null);
  const router = useRouter();

  useEffect(() => setAuthType(router.query.type), [router.query.type]);

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {authType === 'sign-in' ? (
        <Login setAuthType={setAuthType} />
      ) : (
        <Register setAuthType={setAuthType} />
      )}
    </>
  );
}

Auth.login = true;
