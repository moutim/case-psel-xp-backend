'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customerStockWallet', [
      {
        stockId: 1,
        customerId: 1,
        quantity: 10,
        value: 269.50
      },
      {
        stockId: 2,
        customerId: 1,
        quantity: 5,
        value: 376.35
      },
      {
        stockId: 1,
        customerId: 2,
        quantity: 10,
        value: 269.50
      },
      {
        stockId: 2,
        customerId: 2,
        quantity: 5,
        value: 376.35
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customerStockWallet', null, {});
  }
};
