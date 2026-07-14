const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

module.exports = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: WEEK_MS,
});
