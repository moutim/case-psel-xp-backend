const { StatusCodes } = require('http-status-codes');
const { customer } = require('../database/models');
const bcrypt = require('../utils/bcrypt');

const getCustomerInfos = async (customerId) => {
  const customerFound = await customer.findOne({ where: { customerId }, attributes: { exclude: 'password' } });

  if (!customerFound) {
    throw Object({ status: StatusCodes.NOT_FOUND, message: `Customer with id ${customerId} not found` });
  }

  return customerFound;
};

const updateCustomerInfos = async (customerId, body) => {
  const infos = body;

  if (infos.password) {
    infos.password = bcrypt.encodePassword(infos.password);
  }

  try {
    const result = await customer.update({ ...infos }, { where: { customerId } });

    if (result[0]) return { message: 'Information updated successfully' };

    throw Error('There was an error updating the information');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

module.exports = {
  getCustomerInfos,
  updateCustomerInfos,
};
