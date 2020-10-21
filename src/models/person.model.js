module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define("person", {
	id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
      }
    });

  return Person;
};