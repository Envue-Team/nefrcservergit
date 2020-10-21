module.exports = (sequelize, DataTypes) => {
  const RelationshipManager = sequelize.define("relationship_manager", {
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

  return RelationshipManager;
};
