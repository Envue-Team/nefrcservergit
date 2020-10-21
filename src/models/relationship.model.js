module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define("partner", {
    status: {
      type: DataTypes.TEXT
	}
  });

  return Partner;
};