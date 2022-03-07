import { jsonStringify } from './json';

export default (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    const result = await res.json();
    if (!res.ok) throw new Error(jsonStringify(result));
    return result;
  });
