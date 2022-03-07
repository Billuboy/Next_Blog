import cookie from 'cookie';

export default async function handler(req, res) {
  const setLoginCookie = () => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('session_token', req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 3600 * 7,
        path: '/',
      })
    );
  };

  switch (req.method) {
    case 'POST':
      setLoginCookie();
      return res.send('Logged In');
    default:
      return res.status(405).send('Invalid Request Method');
  }
}
