import md5 from 'md5';

const generateToken = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return md5([
    process.env.SECRET,
    date.toString(),
  ].join());
};

export default (req, res, next) => {
  const token = generateToken();

  if (token === req.cookies.token) {
    next();
  } else {
    res.writeHead(401);
    res.end('Forbidden');
  }
};
