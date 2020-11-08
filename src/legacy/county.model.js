module.exports = (sequelize, DataTypes) => {
  const County = sequelize.define("county", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    }
  });

  return County;
};