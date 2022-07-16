'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customer', [
      {
        firstName: 'Vitor',
        lastName: 'Moutim',
        email: 'moutimg@gmail.com',
        password: 'password',
        balance: 150
      },
      {
        firstName: 'Silvania',
        lastName: 'Moutim',
        email: 'silvania_moutim@gmail.com',
        password: 'password',
        balance: 400
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customer', null, {});
  }
};
