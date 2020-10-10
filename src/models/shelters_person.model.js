module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define("volunteer", {
    person_id:{
		type: DataTypes.UUID,
		allowNull: false
	},
	organization_id:{
		type: DataTypes.UUID,
		allowNull: false
	}
  });

  return Volunteer;
};
