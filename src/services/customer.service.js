const { StatusCodes } = require('http-status-codes');
const { customer } = require('../database/models');

const getCustomerInfos = async (customerId) => {
  const customerFound = await customer.findOne({ where: { customerId }, attributes: { exclude: 'password' } });

  if (!customerFound) {
    throw Object({ status: StatusCodes.NOT_FOUND, message: `Customer with id ${customerId} not found` });
  }

  return customerFound;
};

module.exports = {
  getCustomerInfos,
};
