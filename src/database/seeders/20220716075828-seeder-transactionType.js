'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactionType', [
      {
        type: 'compra',
      },
      {
        type: 'venda',
      },
      {
        type: 'saque',
      },
      {
        type: 'deposito',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactionType', null, {});
  }
};
