'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customerTransaction', [
      {
        customerId: 1,
        typeId: 3,
        value: 60,
      },
      {
        customerId: 1,
        typeId: 4,
        value: 70,
      },
      {
        customerId: 2,
        typeId: 4,
        value: 70,
      },
      {
        customerId: 2,
        typeId: 3,
        value: 80,
      },
      {
        customerId: 3,
        typeId: 4,
        value: 70,
      },
      {
        customerId: 3,
        typeId: 3,
        value: 80,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customerTransaction', null, {});
  }
};
