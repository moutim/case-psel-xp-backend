'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customerStockTransaction', [
      {
        stockId: 1,
        customerId: 1,
        quantity: 10,
        value: 269.50,
        typeId: 1,
      },
      {
        stockId: 2,
        customerId: 1,
        quantity: 5,
        value: 376.35,
        typeId: 2
      },
      {
        stockId: 1,
        customerId: 2,
        quantity: 10,
        value: 269.50,
        typeId: 1,
      },
      {
        stockId: 2,
        customerId: 2,
        quantity: 5,
        value: 376.35,
        typeId: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customerStockTransaction', null, {});
  }
};
