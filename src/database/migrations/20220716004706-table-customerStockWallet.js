'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customerStockWallet', {
      customerStockId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'stock',
          key: 'stockId'
        },
        onDelete: 'CASCADE',
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customer',
          key: 'customerId'
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT(20, 2)
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customerStockWallet');
  }
};
