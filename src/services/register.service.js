const Sequelize = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { customer, customerTransaction } = require('../database/models');
const jwt = require('../utils/JWT');
const bcrypt = require('../utils/bcrypt');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const newRegister = async ({
  firstName, lastName, email, password,
}) => {
  const isEmailRegistered = await customer.findOne({ where: { email } });
  if (isEmailRegistered) throw Object({ status: StatusCodes.BAD_REQUEST, message: 'Email already registered' });

  try {
    const typeIdDeposit = 4;
    const encondedPassword = bcrypt.encodePassword(password);

    const transaction = await sequelize.transaction(async (t) => {
      const createCustomer = await customer.create(
        {
          firstName, lastName, email, password: encondedPassword, balance: 500,
        },
        { transaction: t },
      );

      const createTransaction = await customerTransaction.create(
        {
          typeId: typeIdDeposit, customerId: createCustomer.dataValues.customerId, value: 500,
        },
        { transaction: t },
      );

      if (createCustomer && createTransaction) {
        return { customerId: createCustomer.dataValues.customerId };
      }
      return false;
    });

    if (transaction) {
      const token = jwt.generateToken(transaction);
      return { token };
    }

    throw Error('There was an error completing the registration');
  } catch (error) {
    throw Object({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
};

module.exports = {
  newRegister,
};
