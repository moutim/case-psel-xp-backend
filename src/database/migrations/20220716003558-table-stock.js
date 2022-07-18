'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('stock', {
      stockId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT(20, 2)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'company',
          key: 'companyId'
        },
        onDelete: 'CASCADE',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('stock');
  }
};
