const customerTransactionSchema = (sequelize, DataTypes) => {
  const customerTransactionTable = sequelize.define("customerTransaction", {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    typeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    value: DataTypes.FLOAT(20, 2),
    date: DataTypes.DATE
  }, { timestamps: false, freezeTableName: true, } );

  customerTransactionTable.associate = (models) => {
    customerTransactionTable.belongsTo(models.transactionType, { foreignKey: "typeId", as: "type" });

    customerTransactionTable.belongsTo(models.customer, { foreignKey: "customerId", as: "customer" });
  }

  return customerTransactionTable;
}

module.exports = customerTransactionSchema;

