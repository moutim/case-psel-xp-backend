const { StatusCodes } = require('http-status-codes');
const service = require('../services/stock.service');

const getStocks = async (req, res) => {
  const stocks = await service.getStocks();

  res.status(StatusCodes.OK).json(stocks);
};

const buyStocks = async (req, res) => {
  const { customerId } = res.locals.payload;
  const result = await service.buyStocks(customerId, req.body);

  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getStocks,
  buyStocks,
};
