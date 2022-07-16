'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactionCustomer', {
      transactionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customer',
          key: 'customerId'
        },
        onDelete: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactionCustomer');
  }
};
