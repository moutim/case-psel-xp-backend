const errorHandler = require('./error.handler');
const validateLogin = require('./validate.login');
const authenticateToken = require('./authenticate.token');
const verifyUpdateCustomer = require('./verify.update.customer');
const verifyWithdrawDeposit = require('./verify.withdraw.deposit');
const verifyRegister = require('./verify.register');

module.exports = {
  errorHandler,
  validateLogin,
  authenticateToken,
  verifyUpdateCustomer,
  verifyWithdrawDeposit,
  verifyRegister,
};
