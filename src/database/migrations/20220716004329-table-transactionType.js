'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactionType', {
      typeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactionType');
  }
};
