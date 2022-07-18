const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { stock, company } = require('../database/models');

const getStocks = async () => {
  const stocks = await stock.findAll({
    where: { quantity: { [Op.gt]: 0 } },
    include: { model: company, as: 'company' },
    attributes: { exclude: 'companyId' },
  });

  if (stocks.length === 0) throw Object({ status: StatusCodes.NOT_FOUND, message: 'There are no stocks available at the moment' });

  return stocks;
};

module.exports = {
  getStocks,
};
