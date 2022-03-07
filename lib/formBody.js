export default function createFormBody(data) {
  let formBody = [];

  Object.keys(data).forEach((key) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(data[key]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  });

  formBody = formBody.join('&');
  return formBody;
}
