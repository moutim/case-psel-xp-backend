const stockSchema = (sequelize, DataTypes) => {
  const stockTable = sequelize.define("stock", {
    stockId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    value: DataTypes.FLOAT(20, 2),
    quantity: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, { timestamps: false, freezeTableName: true, } );

  stockTable.associate = (models) => {
    stockTable.belongsTo(models.company, { foreignKey: "companyId", as: "company" });
  }

  return stockTable;
}

module.exports = stockSchema;

