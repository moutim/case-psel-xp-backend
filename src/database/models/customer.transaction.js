const customerTransactionSchema = (sequelize, DataTypes) => {
  const customerTransactionTable = sequelize.define("customerTransaction", {
    typeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    value: DataTypes.DECIMAL
  }, { timestamps: false } );

  customerTransactionTable.associate = (models) => {
    customerTransactionTable.belongsTo(models.transactionType, { foreignKey: "typeId", as: "type" });

    customerTransactionTable.belongsTo(models.customer, { foreignKey: "customerId", as: "customer" });
  }

  return customerTransactionTable;
}

module.exports = customerTransactionSchema;

