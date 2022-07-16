'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stock', [
      {
        companyId: 1,
        name: 'PETR4',
        value: 26.95,
        quantity: 300
      },
      {
        companyId: 2,
        name: 'VALE3',
        value: 75.27,
        quantity: 200
      },
      {
        companyId: 3,
        name: 'BBAS3',
        value: 32.73,
        quantity: 500
      },
      {
        companyId: 4,
        name: 'RENT3',
        value: 50.14,
        quantity: 400
      },
      {
        companyId: 5,
        name: 'ASAI3',
        value: 14.82,
        quantity: 125
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stock', null, {});
  }
};
