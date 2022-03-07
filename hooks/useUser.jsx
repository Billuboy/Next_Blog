import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { loginHandler, logoutHandler } from '@lib/auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const getData = async () => {
  const response = await fetch('/api/auth/token');
  const { token } = await response.json();
  if (token) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login/test-token`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    const userData = await data.json();
    return {
      auth: true,
      data: {
        email: userData.email,
        id: userData.id,
        fullName: userData.full_name,
      },
      token,
    };
  }
  return { auth: false };
};

export default function User({ children }) {
  const [user, setUser] = useState({
    auth: false,
    data: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await getData();
      if (result.auth) setUser(result);
      setLoading(false);
    })();
  }, []);

  const login = async (data) => {
    await loginHandler(data);
    const result = await getData();
    if (result.auth) setUser(result);
  };

  const logout = async () => {
    await logoutHandler();
    setUser({ auth: false, data: null, token: null });
  };

  const value = useMemo(
    () => ({
      ...user,
      login,
      logout,
    }),
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
