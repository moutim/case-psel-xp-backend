const stockSchema = (sequelize, DataTypes) => {
  const stockTable = sequelize.define("stock", {
    name: DataTypes.STRING,
    value: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, { timestamps: false } );

  stockTable.associate = (models) => {
    stockTable.belongsTo(models.company, { foreignKey: "companyId", as: "company" });
  }

  return stockTable;
}

module.exports = stockSchema;

