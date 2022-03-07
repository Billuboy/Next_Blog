export default async function handler(req, res) {
  const getLoginCookie = () => {
    let token;
    if (req.cookies?.session_token) {
      token = req.cookies.session_token;
    }
    return token;
  };

  switch (req.method) {
    case 'GET': {
      const token = getLoginCookie();
      return res.json({ token });
    }
    default:
      return res.status(405).send('Invalid Request Method');
  }
}
