const { StatusCodes } = require('http-status-codes');

const service = require('../services/customer.service');

const getCustomerInfos = async (req, res) => {
  const { customerId } = res.locals.payload;
  const customerInfos = await service.getCustomerInfos(customerId);

  res.status(StatusCodes.OK).json(customerInfos);
};

const updateCustomerInfos = async (req, res) => {
  const { customerId } = res.locals.payload;
  const result = await service.updateCustomerInfos(customerId, req.body);

  res.status(StatusCodes.OK).json(result);
};

const withdraw = async (req, res) => {
  const { customerId } = res.locals.payload;
  const result = await service.withdraw(customerId, req.body.value);

  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getCustomerInfos,
  updateCustomerInfos,
  withdraw,
};
