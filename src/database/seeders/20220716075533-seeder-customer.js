'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customer', [
      {
        firstName: 'Vitor',
        lastName: 'Moutim',
        email: 'moutimg@gmail.com',
        password: '$2b$10$wYeJ4kRrLrrQK1hboCBh4uTeq.Vm9kgLgpNlWA/pW5/l6VRCz.xMq',
        balance: 150
      },
      {
        firstName: 'Silvania',
        lastName: 'Moutim',
        email: 'silvania_moutim@gmail.com',
        password: '$2b$10$wYeJ4kRrLrrQK1hboCBh4uTeq.Vm9kgLgpNlWA/pW5/l6VRCz.xMq',
        balance: 400
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customer', null, {});
  }
};
