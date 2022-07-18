const { StatusCodes } = require('http-status-codes');
const service = require('../services/stock.service');

const getStocks = async (req, res) => {
  const stocks = await service.getStocks();

  res.status(StatusCodes.OK).json(stocks);
};

module.exports = {
  getStocks,
};
