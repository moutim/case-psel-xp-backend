const variationTypeSchema = (sequelize, DataTypes) => {
  const variationTypeTable = sequelize.define("variationType", {
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
  }, { timestamps: false, freezeTableName: true, } );

  variationTypeTable.associate = (models) => {
    variationTypeTable.hasOne(models.stockVariation, { foreignKey: "typeId", as: "variation" });
  }

  return variationTypeTable;
}

module.exports = variationTypeSchema;

