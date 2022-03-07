import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@components/auth/login'), {
  loading: () => <p>Loading...</p>,
});

const Register = dynamic(() => import('@components/auth/register'), {
  loading: () => <p>Loading...</p>,
});

export default function Auth() {
  const [authType, setAuthType] = useState('register');

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {authType === 'login' ? (
        <Login setAuthType={setAuthType} />
      ) : (
        <Register setAuthType={setAuthType} />
      )}
    </>
  );
}
