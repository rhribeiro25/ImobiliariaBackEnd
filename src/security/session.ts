import session from 'express-session';

export default session({
  secret: '06af1839132ec32f3b6e5691f2793f71',
  resave: true,
  saveUninitialized: true,
  cookie: {},
});
