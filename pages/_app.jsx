/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';

import UserProvider from '@hooks/useUser';
import Header from '@components/header';
import { AuthGuard, LoginGuard } from '@components/guard';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <div className="w-full flex justify-center">
        <div className="min-h-[calc(100vh-72px)] w-[1437px]">
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
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
