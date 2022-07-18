const customerSchema = (sequelize, DataTypes) => {
  const customerTable = sequelize.define("customer", {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.FLOAT(15, 2),
  }, { timestamps: false, freezeTableName: true, } );

  customerTable.associate = (models) => {
    customerTable.hasOne(models.customerTransaction, { foreignKey: "customerId", as: "transaction" });
  }

  return customerTable;
}

module.exports = customerSchema;

