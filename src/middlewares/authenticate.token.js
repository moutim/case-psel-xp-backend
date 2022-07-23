const jwt = require('../utils/JWT');

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;
  let auth = authorization;

  if (authorization.includes('Bearer')) {
    const getAuth = authorization.split(' ')[1];
    auth = getAuth;
  }

  const payload = jwt.authenticateToken(auth);

  res.locals.payload = payload;

  next();
};

module.exports = authenticateToken;
