const errorHandler = require('./error.handler');
const validateLogin = require('./validate.login');
const authenticateToken = require('./authenticate.token');
const verifyUpdateCustomer = require('./verify.update.customer');
const verifyWithdraw = require('./verify.withdraw');

module.exports = {
  errorHandler,
  validateLogin,
  authenticateToken,
  verifyUpdateCustomer,
  verifyWithdraw,
};
