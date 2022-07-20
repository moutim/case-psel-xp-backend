'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('variationType', [
      {
        type: 'up',
      },
      {
        type: 'down',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('variationType', null, {});
  }
};
