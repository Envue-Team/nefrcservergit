module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define("phone", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING
    }
  });

  return Phone;
};
