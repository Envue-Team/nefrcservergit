module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define("volunteer", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.BOOLEAN
    }
  });

  return Volunteer;
};
