const { StatusCodes } = require('http-status-codes');
const { customer } = require('../database/models');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/JWT');

const login = async ({ email, password }) => {
  const customerFound = await customer.findOne({ where: { email } });

  if (!customerFound) {
    throw Object({ status: StatusCodes.NOT_FOUND, message: 'Email not found' });
  }

  if (!comparePassword(password, customerFound.dataValues.password)) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Incorrect password' });
  }

  const token = generateToken({ customerId: customerFound.dataValues.customerId });

  delete customerFound.dataValues.password;

  return { token, ...customerFound.dataValues };
};

module.exports = {
  login,
};
