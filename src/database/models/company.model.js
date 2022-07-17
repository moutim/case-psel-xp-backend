const companySchema = (sequelize, DataTypes) => {
  const companyTable = sequelize.define("company", {
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, { timestamps: false, freezeTableName: true, } );

  companyTable.associate = (models) => {
    companyTable.hasOne(models.stock, { foreignKey: "companyId", as: "stock" });
  }

  return companyTable;
}

module.exports = companySchema;

