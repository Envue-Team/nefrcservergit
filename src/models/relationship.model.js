module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define("relationship", {
    status: {
      type: DataTypes.TEXT
	}
  });

  return Relationship;
};