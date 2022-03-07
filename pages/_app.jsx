/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';

import React from 'react';

import UserProvider from '@hooks/useUser';
import Header from '@components/header';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
