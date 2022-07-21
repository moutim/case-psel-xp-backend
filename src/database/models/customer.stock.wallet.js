const walletCustomer = (sequelize, DataTypes) => {
  const walletCustomerTable = sequelize.define("customerStockWallet", 
  {
    customerStockId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stockId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date: DataTypes.DATE
  },
  { timestamps: false, freezeTableName: true, }
  );

  walletCustomerTable.associate = (models) => {
    models.customer.belongsToMany(models.stock, {
      through: walletCustomerTable,
      foreignKey: 'customerId',
      otherKey: 'stockId',
      as: 'stockWallet'
    });

    models.stock.belongsToMany(models.customer, {
      through: walletCustomerTable,
      foreignKey: 'stockId',
      otherKey: 'customerId',
      as: 'customerWallet'
    });
  }

  return walletCustomerTable;
}

module.exports = walletCustomer;

