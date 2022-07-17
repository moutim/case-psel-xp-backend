const walletCustomer = (sequelize, DataTypes) => {
  const walletCustomerTable = sequelize.define("customerStockWallet", 
  {
    stockId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    value: DataTypes.DECIMAL
  },
  { timestamps: false, freezeTableName: true, }
  );

  walletCustomerTable.associate = (models) => {
    models.customer.belongsToMany(models.stock, {
      through: walletCustomerTable,
      foreignKey: 'customerId',
      otherKey: 'stockId',
      as: 'stock'
    });

    models.stock.belongsToMany(models.customer, {
      through: walletCustomerTable,
      foreignKey: 'stockId',
      otherKey: 'customerId',
      as: 'customer'
    });
  }

  return walletCustomerTable;
}

module.exports = walletCustomer;

