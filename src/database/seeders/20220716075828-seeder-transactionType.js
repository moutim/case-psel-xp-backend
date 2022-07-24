'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactionType', [
      {
        type: 'buy',
      },
      {
        type: 'sell',
      },
      {
        type: 'withdraw',
      },
      {
        type: 'deposit',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactionType', null, {});
  }
};
