'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('stockVariation', {
      variationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'variationType',
          key: 'typeId'
        },
        onDelete: 'CASCADE',
      },
      percentage: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      oldPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      newPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('stockVariation');
  }
};
