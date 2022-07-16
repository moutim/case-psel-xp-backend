const customerSchema = (sequelize, DataTypes) => {
  const customerTable = sequelize.define("customer", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
  }, { timestamps: false } );

  customerTable.associate = (models) => {
    customerTable.hasOne(models.customerTransaction, { foreignKey: "customerId", as: "transaction" });
  }

  return customerTable;
}

module.exports = customerSchema;

