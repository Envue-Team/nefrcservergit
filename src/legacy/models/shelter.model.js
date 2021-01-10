module.exports = (sequelize, Sequelize) => {
  const Shelter = sequelize.define("shelter", {
    name: {
      type: Sequelize.STRING
    },
    street_name: {
      type: Sequelize.STRING
    },
    street_number: {
      type: Sequelize.STRING
	},
	city: {
      type: Sequelize.STRING
	},
	state: {
      type: Sequelize.STRING
    },
	zip: {
      type: Sequelize.STRING
    }
  });

  return Shelter;
};