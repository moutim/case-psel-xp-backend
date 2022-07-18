'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customerStockTransaction', {
      transactionId: {
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
      value: {
        allowNull: false,
        type: Sequelize.FLOAT(20, 2)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'transactionType',
          key: 'typeId'
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customerStockTransaction');
  }
};
