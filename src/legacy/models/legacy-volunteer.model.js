module.exports = (sequelize, Sequelize) => {
  const Volunteer = sequelize.define("volunteer", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Volunteer;
};
