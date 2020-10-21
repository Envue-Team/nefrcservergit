module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define("partner", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    services: {
      type: DataTypes.TEXT
	},
	critical_relationship_information: {
      type: DataTypes.TEXT
    }
  });

  return Partner;
};