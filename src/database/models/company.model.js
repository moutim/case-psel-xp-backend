const companySchema = (sequelize, DataTypes) => {
  const companyTable = sequelize.define("company", {
    name: DataTypes.STRING,
  }, { timestamps: false } );

  companyTable.associate = (models) => {
    companyTable.hasOne(models.stock, { foreignKey: "companyId", as: "stock" });
  }

  return companyTable;
}

module.exports = companySchema;

