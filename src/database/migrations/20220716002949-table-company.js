'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('company', {
      companyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('company');
  }
};
