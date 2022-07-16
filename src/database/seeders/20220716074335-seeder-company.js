'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('company', [
      {
        name: 'BR Petrobras',
      },
      {
        name: 'VALE',
      },
      {
        name: 'Banco do Brasil',
      },
      {
        name: 'Localiza',
      },
      {
        name: 'Assaí Atacadista',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('company', null, {});
  }
};
