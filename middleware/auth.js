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

const generateMaxAge = () => {
  const endDayDate = new Date();
  endDayDate.setHours(23);
  endDayDate.setMinutes(59);
  endDayDate.setSeconds(59);

  return (endDayDate.getTime() - Date.now()) / 1000;
};

export default ({ app }) => {
  const token = generateToken();

  app.$cookies.set('token', token, {
    path: '/',
    maxAge: generateMaxAge(),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
};
