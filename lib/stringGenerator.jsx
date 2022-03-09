export default () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const str = Array(6)
    .fill('0')
    .reduce(
      (acc) => acc + chars.charAt(Math.floor(Math.random() * chars.length)),
      ''
    );
  return str;
};
