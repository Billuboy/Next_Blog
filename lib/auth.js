import createFormBody from '@lib/formBody';
import { jsonStringify } from '@lib/json';

export async function logoutHandler() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export async function loginHandler(data) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/login/access-token`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: createFormBody(data),
    }
  );
  const json = await response.json();

  if (!response.ok) throw new Error(jsonStringify(json));
  else {
    const body = {
      token: `${json.token_type} ${json.access_token}`,
    };

    await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: jsonStringify(body),
    });
  }
}
