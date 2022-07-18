const { StatusCodes } = require('http-status-codes');
const Sequelize = require('sequelize');
const { customer, customerTransaction } = require('../database/models');
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
      await customer.update(
        { balance: newBalance.toString() },
        { where: { customerId } },
        { transction: t },
      );
      await customerTransaction.create(
        { typeId: typeIdWithdraw, customerId, value },
        { transaction: t },
      );

      return true;
    });

    if (transaction) return { message: 'Withdrawal successful' };

    throw Error('An error occurred while performing the transaction');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

module.exports = {
  getCustomerInfos,
  updateCustomerInfos,
  withdraw,
};
