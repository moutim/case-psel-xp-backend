const errorHandler = require('./error.handler');
const validateLogin = require('./validate.login');
const authenticateToken = require('./authenticate.token');
const verifyUpdateCustomer = require('./verify.update.customer');

module.exports = {
  errorHandler,
  validateLogin,
  authenticateToken,
  verifyUpdateCustomer,
};
