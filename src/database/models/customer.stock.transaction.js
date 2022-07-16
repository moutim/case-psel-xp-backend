const transactionStockSchema = (sequelize, DataTypes) => {
  const transactionStockTable = sequelize.define("customerStockTransaction",
    {
    stockId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    value: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
    },
  { timestamps: false }
  );

  transactionStockTable.associate = (models) => {
    transactionStockTable.belongsTo(models.transactionType, { foreignKey: "typeId", as: "type" });

    models.customer.belongsToMany(models.stock, {
      through: transactionStockTable,
      foreignKey: 'customerId',
      otherKey: 'stockId',
      as: 'stock'
    });

    models.stock.belongsToMany(models.customer, {
      through: transactionStockTable,
      foreignKey: 'stockId',
      otherKey: 'customerId',
      as: 'customer'
    });
  }

  return transactionStockTable;
}

module.exports = transactionStockSchema;

