const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const {
  customer, customerTransaction, transactionType,
} = require('../database/models');
const bcrypt = require('../utils/bcrypt');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

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

const withdraw = async (customerId, value) => {
  const customerFound = await customer.findOne({ where: { customerId } });

  const customerBalance = parseFloat(customerFound.dataValues.balance);

  if (value > customerBalance) throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Insufficient balance for this transaction' });

  try {
    const newBalance = customerBalance - value;
    const typeIdWithdraw = 3;

    const transaction = await sequelize.transaction(async (t) => {
      const customerUpdate = await customer.update(
        { balance: newBalance },
        { where: { customerId } },
        { transction: t },
      );
      const transactionCreate = await customerTransaction.create(
        {
          typeId: typeIdWithdraw, customerId, value, date: new Date(),
        },
        { transaction: t },
      );

      if (customerUpdate && transactionCreate) {
        return { transactionId: transactionCreate.dataValues.transactionId };
      }
      return false;
    });

    if (transaction) {
      return {
        message: 'Withdrawal successful',
        transactionId: transaction.transactionId,
        customerId,
        value,
      };
    }

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

const deposit = async (customerId, value) => {
  const customerFound = await customer.findOne({ where: { customerId } });

  const customerBalance = parseFloat(customerFound.dataValues.balance);

  try {
    const newBalance = customerBalance + value;
    const typeIdDeposit = 4;

    const transaction = await sequelize.transaction(async (t) => {
      const customerUpdate = await customer.update(
        { balance: newBalance },
        { where: { customerId } },
        { transction: t },
      );
      const transactionCreate = await customerTransaction.create(
        {
          typeId: typeIdDeposit, customerId, value, date: new Date(),
        },
        { transaction: t },
      );

      if (customerUpdate && transactionCreate) {
        return { transactionId: transactionCreate.dataValues.transactionId };
      }
      return false;
    });

    if (transaction) {
      return {
        message: 'Deposit made successfully',
        transactionId: transaction.transactionId,
        customerId,
        value,
      };
    }

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

const deleteCustomer = async (customerId) => {
  const customerDeleted = await customer.destroy({ where: { customerId } });

  if (!customerDeleted) throw Object({ status: StatusCodes.BAD_REQUEST, message: 'There was an error deleting the user' });

  return { message: 'User successfully deleted' };
};

const getCustomerTransactions = async (customerId) => {
  const transactions = await customerTransaction.findAll({
    include: { model: transactionType, as: 'type', attributes: { exclude: ['typeId'] } },
    attributes: { exclude: ['typeId'] },
    where: { customerId },
  });

  if (transactions.length === 0) throw Object({ status: StatusCodes.NOT_FOUND, message: "You don't have transactions yet" });

  return transactions;
};

const getCustomerStocksWallet = async (customerId) => {
  const stocksWallet = await sequelize.query(
    `SELECT 
      a.customerId,
      a.stockId,
      b.name,
      a.quantity,
      c.name AS "companyName",
      a.date,
      SUM(b.value * a.quantity) AS "value"
    FROM customerStockWallet AS a
    INNER JOIN stock AS b
    ON a.stockId = b.stockId
    INNER JOIN company AS c
    ON b.companyId = c.companyId
    WHERE a.customerId = ?
    AND a.quantity > 0
    GROUP BY
      a.stockId,
      b.name,
      a.quantity,
      "companyName",
      a.date,
      "amount";`,
    {
      replacements: [customerId],
      type: QueryTypes.SELECT,
    },
  );

  if (stocksWallet.length === 0) {
    stocksWallet.push({ message: "You don't have any stocks in your wallet" });
  }

  return stocksWallet;
};

const getCustomerStocksTransactions = async (customerId) => {
  const stocksTransactions = await sequelize.query(
    `SELECT
      a.customerId,
      a.transactionId,
      a.stockId,
      c.name,
      a.quantity,
      a.value,
      d.name AS "companyName",
      b.type AS "transactionType",
      a.date
    FROM customerStockTransaction AS a
    INNER JOIN transactionType AS b
    ON a.typeId = b.typeId
    INNER JOIN stock AS c
    ON c.stockId = a.stockId
    INNER JOIN company AS d
    ON c.companyId = d.companyId
    WHERE a.customerId = ?;`,
    {
      replacements: [customerId],
      type: QueryTypes.SELECT,
    },
  );

  if (stocksTransactions.length === 0) {
    stocksTransactions.push({ message: "'You have not executed any stock transactions yet'" });
  }

  return stocksTransactions;
};

const getCustomerStocks = async (customerId) => {
  const stocksWallet = await getCustomerStocksWallet(customerId);

  const stocksTransactions = await getCustomerStocksTransactions(customerId);

  return { stocksWallet, stocksTransactions };
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
