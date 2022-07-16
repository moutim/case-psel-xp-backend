'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('walletCustomerStock', {
      stockId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'stock',
          key: 'stockId'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customer',
          key: 'customerId'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('walletCustomerStock');
  }
};
