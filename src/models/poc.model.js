module.exports = (sequelize, DataTypes) => {
  const POC = sequelize.define("poc", {
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

  return POC;
};
