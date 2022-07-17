const transactionTypeSchema = (sequelize, DataTypes) => {
  const transactionTypeTable = sequelize.define("transactionType", {
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
  }, { timestamps: false, freezeTableName: true, } );

  transactionTypeTable.associate = (models) => {
    transactionTypeTable.hasOne(models.customerTransaction, { foreignKey: "typeId", as: "transaction" });

    transactionTypeTable.hasOne(models.customerStockTransaction, { foreignKey: "typeId", as: "dealStock" });
  }

  return transactionTypeTable;
}

module.exports = transactionTypeSchema;

