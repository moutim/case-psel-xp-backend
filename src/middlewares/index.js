const errorHandler = require('./error.handler');
const validateLogin = require('./validate.login');
const authenticateToken = require('./authenticate.token');

module.exports = {
  errorHandler,
  validateLogin,
  authenticateToken,
};
