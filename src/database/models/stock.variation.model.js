const stockVariationSchema = (sequelize, DataTypes) => {
  const stockVatiationTable = sequelize.define("stockVariation", {
    variationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stockId: DataTypes.INTEGER,
    percentage: DataTypes.FLOAT(20, 2),
    oldPrice: DataTypes.FLOAT(20, 2),
    newPrice: DataTypes.FLOAT(20, 2),
    high: DataTypes.FLOAT(20, 2),
    low: DataTypes.FLOAT(20,2),
    date: DataTypes.DATE,
    typeId: DataTypes.INTEGER
  }, { timestamps: false, freezeTableName: true, } );

  stockVatiationTable.associate = (models) => {
    stockVatiationTable.belongsTo(models.variationType, { foreignKey: "typeId", as: "type" });

    stockVatiationTable.belongsTo(models.stock, { foreignKey: "stockId", as: "stock" });
  }

  return stockVatiationTable;
}

module.exports = stockVariationSchema;

