const transactionTypeSchema = (sequelize, DataTypes) => {
  const transactionTypeTable = sequelize.define("transactionType", {
    type: DataTypes.STRING,
  }, { timestamps: false } );

  transactionTypeTable.associate = (models) => {
    transactionTypeTable.hasOne(models.customerTransaction, { foreignKey: "typeId", as: "transaction" });

    transactionTypeTable.hasOne(models.customerStockTransaction, { foreignKey: "typeId", as: "dealStock" });
  }

  return transactionTypeTable;
}

module.exports = transactionTypeSchema;

