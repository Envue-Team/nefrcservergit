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
    },
    street_number: {
      type: DataTypes.INTEGER
    },
    street_name: {
      type: DataTypes.STRING
    },
    city:{
      type: DataTypes.STRING
    },
    state:{
      type:DataTypes.STRING,
      defaultValue:"FL"
    },
    zip:{
      type:DataTypes.INTEGER
    },
    county: {
      type: DataTypes.STRING
    },
    
    });

  return Person;
};