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

const deposit = async (req, res) => {
  const { customerId } = res.locals.payload;
  const result = await service.deposit(customerId, req.body.value);

  res.status(StatusCodes.OK).json(result);
};

const deleteCustomer = async (req, res) => {
  const { customerId } = res.locals.payload;
  const result = await service.deleteCustomer(customerId);

  res.status(StatusCodes.OK).json(result);
};

const getCustomerTransactions = async (req, res) => {
  const { customerId } = res.locals.payload;
  const transactions = await service.getCustomerTransactions(customerId);

  res.status(StatusCodes.OK).json(transactions);
};

const getCustomerStocks = async (req, res) => {
  const { customerId } = res.locals.payload;
  const stocks = await service.getCustomerStocks(customerId);

  res.status(StatusCodes.OK).json(stocks);
};

module.exports = {
  getCustomerInfos,
  updateCustomerInfos,
  withdraw,
  deposit,
  deleteCustomer,
  getCustomerTransactions,
  getCustomerStocks,
};
