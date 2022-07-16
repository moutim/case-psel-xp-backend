'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customerTransaction', [
      {
        customerId: 1,
        typeId: 1,
        value: 60,
      },
      {
        customerId: 1,
        typeId: 2,
        value: 70,
      },
      {
        customerId: 2,
        typeId: 1,
        value: 70,
      },
      {
        customerId: 2,
        typeId: 2,
        value: 80,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customerTransaction', null, {});
  }
};
