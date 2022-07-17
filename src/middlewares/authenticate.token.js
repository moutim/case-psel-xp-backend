const jwt = require('../utils/JWT');

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = jwt.authenticateToken(authorization);

  res.locals.payload = payload;

  next();
};

module.exports = authenticateToken;
