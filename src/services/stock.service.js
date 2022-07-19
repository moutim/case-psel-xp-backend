const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const {
  stock, company, customerStockWallet, customerStockTransaction, customer,
} = require('../database/models');
const customerService = require('./customer.service');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const getStocks = async () => {
  const stocks = await stock.findAll({
    where: { quantity: { [Op.gt]: 0 } },
    include: { model: company, as: 'company' },
    attributes: { exclude: 'companyId' },
  });

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
        customerId, stockId, value: stocksValue, quantity, typeId: typeIdBuy,
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
          },
          { where: { customerId, stockId } },
          { transaction: t },
        );

        if (updateBalance && updateStock && createStockTransaction && updateWallet) {
          return { transactionId: createStockTransaction.dataValues.transactionId };
        }
        return false;
      }

      // Cria nova ação na carteira do cliente
      const createStockWallet = await customerStockWallet.create({
        customerId, stockId, quantity, value: stocksValue,
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

module.exports = {
  getStocks,
  buyStocks,
};
