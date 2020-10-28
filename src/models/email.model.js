module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define("email", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    }
  });

  return Email;
};