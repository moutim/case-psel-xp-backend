const { StatusCodes } = require('http-status-codes');

const service = require('../services/customer.service');

const getCustomerInfos = async (req, res) => {
  const { customerId } = res.locals.payload;
  const customerInfos = await service.getCustomerInfos(customerId);

  res.status(StatusCodes.OK).json(customerInfos);
};

module.exports = {
  getCustomerInfos,
};
