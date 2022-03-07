/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';

import UserProvider from '@hooks/useUser';
import Header from '@components/header';
import { AuthGuard, LoginGuard } from '@components/guard';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      {Component.auth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : null}
      {Component.login ? (
        <LoginGuard>
          <Component {...pageProps} />
        </LoginGuard>
      ) : null}
      {!Component.auth && !Component.login ? (
        <Component {...pageProps} />
      ) : null}
    </UserProvider>
  );
}

export default MyApp;
