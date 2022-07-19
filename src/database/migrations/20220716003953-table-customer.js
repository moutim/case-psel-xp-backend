'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customer', {
      customerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      balance: {
        allowNull: false,
        type: Sequelize.FLOAT(15, 2)
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customer');
  }
};
