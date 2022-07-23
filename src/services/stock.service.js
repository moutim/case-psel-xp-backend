const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const {
  stock,
  customerStockWallet,
  customerStockTransaction,
  customer,
} = require('../database/models');
const customerService = require('./customer.service');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const getStocks = async () => {
  const stocks = await sequelize.query(
    `SELECT
      a.stockId,
      a.name,
      a.value,
      a.quantity,
      c.name AS "companyName",
      d.percentage AS "percentageVariation",
      d.high,
      d.low,
      d.oldPrice,
      e.type AS "typeVariation",
      SUM(a.value * b.quantity) AS "totalInvested"
    FROM stock AS a
    LEFT JOIN customerStockWallet AS b
    ON a.stockId = b.stockId
    INNER JOIN company AS c
    ON a.companyId = c.companyId
    INNER JOIN stockVariation AS d
    ON a.stockId = d.stockId
    INNER JOIN variationType AS e
    ON d.typeId = e.typeId
    WHERE a.quantity > 0
    GROUP BY 
      a.stockId,
      d.high,
      d.low,
      d.oldPrice,
      d.percentage,
      e.type;`,
    {
      type: Sequelize.QueryTypes.SELECT,
    },
  );

  if (stocks.length === 0) throw Object({ status: StatusCodes.NOT_FOUND, message: 'There are no stocks available at the moment' });

  return stocks;
};

const getStockById = async (stockId) => {
  const stocks = await sequelize.query(
    `SELECT
      a.stockId,
      a.name,
      a.value,
      a.quantity,
      c.name AS "companyName",
      d.percentage AS "percentageVariation",
      d.high,
      d.low,
      d.oldPrice,
      e.type AS "typeVariation",
      SUM(a.value * b.quantity) AS "totalInvested"
    FROM stock AS a
    LEFT JOIN customerStockWallet AS b
    ON a.stockId = b.stockId
    INNER JOIN company AS c
    ON a.companyId = c.companyId
    INNER JOIN stockVariation AS d
    ON a.stockId = d.stockId
    INNER JOIN variationType AS e
    ON d.typeId = e.typeId
    WHERE a.quantity > 0
    AND a.stockId = ?
    GROUP BY 
      a.stockId,
      d.high,
      d.low,
      d.oldPrice,
      d.percentage,
      e.type;`,
    {
      replacements: [stockId],
      type: Sequelize.QueryTypes.SELECT,
    },
  );

  if (stocks.length === 0) throw Object({ status: StatusCodes.NOT_FOUND, message: `Stock with id ${stockId} not found` });

  return stocks;
};

const checkStockQuantityAvailable = (stockToCompare, quantity) => {
  if (quantity > stockToCompare.dataValues.quantity) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'There are not enough stocks to make the purchase' });
  }
};

const checkCustomerBalance = (customerToCompare, value) => {
  if (value > customerToCompare.dataValues.balance) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Insufficient balance for this transaction' });
  }
};

const findStock = async (stockId) => {
  const stockFound = await stock.findOne({ where: { stockId } });

  if (!stockFound) throw Object({ status: StatusCodes.NOT_FOUND, message: `Stock with id ${stockId} not found` });

  return stockFound;
};

const buyStocks = async (customerId, stockInfo) => {
  const { stockId, quantity } = stockInfo;

  const customerInfos = await customerService.getCustomerInfos(customerId);

  const stockFound = await findStock(stockId);

  if (!stockFound) throw Object({ status: StatusCodes.NOT_FOUND, message: `Stock with id ${stockId} not found` });

  checkStockQuantityAvailable(stockFound, quantity);

  const stocksValue = stockFound.dataValues.value * quantity;

  checkCustomerBalance(customerInfos, stocksValue);

  try {
    const typeIdBuy = 1;

    const transaction = await sequelize.transaction(async (t) => {
      const updateBalance = await customer.update(
        { balance: customerInfos.dataValues.balance - stocksValue },
        { where: { customerId } },
        { transaction: t },
      );

      const updateStock = await stock.update(
        { quantity: stockFound.dataValues.quantity - quantity },
        { where: { stockId } },
        { transaction: t },
      );

      const createStockTransaction = await customerStockTransaction.create({
        customerId, stockId, value: stocksValue, quantity, typeId: typeIdBuy, date: new Date(),
      }, { transaction: t });

      const customerHasStocks = await customerStockWallet.findOne(
        { where: { customerId, stockId } },
      );

      if (customerHasStocks) {
        const updateWallet = await customerStockWallet.update(
          {
            quantity: customerHasStocks.dataValues.quantity + quantity,
            value: customerHasStocks.dataValues.value + stocksValue,
            date: new Date(),
          },
          { where: { [Op.and]: [{ customerId }, { stockId }] } },
          { transaction: t },
        );

        if (updateBalance && updateStock && createStockTransaction && updateWallet) {
          return { transactionId: createStockTransaction.dataValues.transactionId };
        }
        return false;
      }

      const createStockWallet = await customerStockWallet.create({
        customerId, stockId, quantity, value: stocksValue, date: new Date(),
      }, { transaction: t });

      if (updateBalance && updateStock && createStockTransaction && createStockWallet) {
        return {
          transactionId: createStockTransaction.dataValues.transactionId,
          customerId,
          stockId,
          quantity,
        };
      }
      return false;
    });

    if (transaction) {
      return {
        message: 'Successful purchase',
        transactionId: transaction.transactionId,
        customerId,
        stockId,
        quantity,
      };
    }

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

const checkCustomerStockWallet = (customerWallet, quantity) => {
  if (quantity > customerWallet.dataValues.quantity) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: `You have only ${customerWallet.dataValues.quantity} stocks available for sale` });
  }
};

const sellStocks = async (customerId, stockInfo) => {
  const { stockId, quantity } = stockInfo;

  const customerInfos = await customerService.getCustomerInfos(customerId);

  const stockFound = await await findStock(stockId);

  const stocksValue = stockFound.dataValues.value * quantity;

  const customerWallet = await customerStockWallet.findOne({ where: { customerId, stockId } });

  checkCustomerStockWallet(customerWallet);

  try {
    const typeIdSell = 2;

    const transaction = await sequelize.transaction(async (t) => {
      const updateBalance = await customer.update(
        { balance: customerInfos.dataValues.balance + stocksValue },
        { where: { customerId } },
        { transaction: t },
      );

      const updateStock = await stock.update(
        { quantity: stockFound.dataValues.quantity + quantity },
        { where: { stockId } },
        { transaction: t },
      );

      const createStockTransaction = await customerStockTransaction.create({
        customerId, stockId, value: stocksValue, quantity, typeId: typeIdSell, date: new Date(),
      }, { transaction: t });

      const updateWallet = await customerStockWallet.update(
        {
          quantity: customerWallet.dataValues.quantity - quantity,
          value: customerWallet.dataValues.value - stocksValue,
          date: new Date(),
        },
        { where: { customerId, stockId } },
        { transaction: t },
      );

      if (updateBalance && updateStock && createStockTransaction && updateWallet) {
        return {
          transactionId: createStockTransaction.dataValues.transactionId,
          customerId,
          stockId,
          quantity,
        };
      }
      return false;
    });

    if (transaction) {
      return {
        message: 'Successful sale',
        transactionId: transaction.transactionId,
        customerId,
        stockId,
        quantity,
      };
    }

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

module.exports = {
  checkStockQuantityAvailable,
  checkCustomerBalance,
  findStock,
  checkCustomerStockWallet,
  getStocks,
  buyStocks,
  sellStocks,
  getStockById,
};
