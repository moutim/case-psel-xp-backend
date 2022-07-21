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

const buyStocks = async (customerId, stockInfo) => {
  const { stockId, quantity } = stockInfo;

  const customerInfos = await customerService.getCustomerInfos(customerId);

  // Verifica se a ação existe
  const stockFound = await stock.findOne({ where: { stockId } });
  if (!stockFound) throw Object({ status: StatusCodes.NOT_FOUND, message: `Stock with id ${stockId} not found` });

  // Verifica se há ações suficientes para compra
  if (quantity > stockFound.dataValues.quantity) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'There are not enough stocks to make the purchase' });
  }

  const stocksValue = stockFound.dataValues.value * quantity;

  // Verifica se o cliente tem saldo suficiente para à compra
  if (stocksValue > customerInfos.dataValues.balance) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Insufficient balance for this transaction' });
  }

  try {
    const typeIdBuy = 1;

    const transaction = await sequelize.transaction(async (t) => {
      // Atualiza balance do cliente
      const updateBalance = await customer.update(
        { balance: customerInfos.dataValues.balance - stocksValue },
        { where: { customerId } },
        { transaction: t },
      );

      // Atualiza quantidade de stocks na tabela
      const updateStock = await stock.update(
        { quantity: stockFound.dataValues.quantity - quantity },
        { where: { stockId } },
        { transaction: t },
      );

      // Cria registro da compra
      const createStockTransaction = await customerStockTransaction.create({
        customerId, stockId, value: stocksValue, quantity, typeId: typeIdBuy, date: new Date(),
      }, { transaction: t });

      // Verifica se o cliente já possui alguma ação
      const customerHasStocks = await customerStockWallet.findOne(
        { where: { customerId, stockId } },
      );
      if (customerHasStocks) {
        // Atualiza carteira de ações do cliente
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

      // Cria nova ação na carteira do cliente
      const createStockWallet = await customerStockWallet.create({
        customerId, stockId, quantity, value: stocksValue, date: new Date(),
      }, { transaction: t });

      if (updateBalance && updateStock && createStockTransaction && createStockWallet) {
        return { transactionId: createStockTransaction.dataValues.transactionId };
      }
      return false;
    });

    if (transaction) return { message: 'Successful purchase', transactionId: transaction.transactionId };

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

const sellStocks = async (customerId, stockInfo) => {
  const { stockId, quantity } = stockInfo;

  const customerInfos = await customerService.getCustomerInfos(customerId);

  // Verifica se a ação existe
  const stockFound = await stock.findOne({ where: { stockId } });
  if (!stockFound) throw Object({ status: StatusCodes.NOT_FOUND, message: `Stock with id ${stockId} not found` });

  const stocksValue = stockFound.dataValues.value * quantity;

  // Verifica se o cliente tem ações suficientes para venda
  const customerWallet = await customerStockWallet.findOne({ where: { customerId, stockId } });
  if (quantity > customerWallet.dataValues.quantity) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: `You have only ${customerWallet.dataValues.quantity} stocks available for sale` });
  }

  try {
    const typeIdSell = 2;

    const transaction = await sequelize.transaction(async (t) => {
      // Atualiza balance do cliente
      const updateBalance = await customer.update(
        { balance: customerInfos.dataValues.balance + stocksValue },
        { where: { customerId } },
        { transaction: t },
      );

      // Atualiza quantidade de stocks na tabela
      const updateStock = await stock.update(
        { quantity: stockFound.dataValues.quantity + quantity },
        { where: { stockId } },
        { transaction: t },
      );

      // Cria registro da compra
      const createStockTransaction = await customerStockTransaction.create({
        customerId, stockId, value: stocksValue, quantity, typeId: typeIdSell, date: new Date(),
      }, { transaction: t });

      // Atualiza carteira do cliente
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
        return { transactionId: createStockTransaction.dataValues.transactionId };
      }
      return false;
    });

    if (transaction) return { message: 'Successful sale', transactionId: transaction.transactionId };

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

module.exports = {
  getStocks,
  buyStocks,
  sellStocks,
};
