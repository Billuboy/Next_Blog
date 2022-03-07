import cookie from 'cookie';

export default function handler(req, res) {
  const logout = () => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('session_token', '', {
        maxAge: -1,
        path: '/',
      })
    );
  };

  switch (req.method) {
    case 'POST':
      logout();
      return res.send('Logged Out');
    default:
      return res.status(405).send('Invalid Request Method');
  }
}
