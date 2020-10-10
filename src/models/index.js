const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Convert to db objects here
db.volunteers = require("./volunteer.model.js")(sequelize, Sequelize);
db.shelters = require("./shelter.model.js")(sequelize, Sequelize);
db.persons = require("./person.model.js")(sequelize, Sequelize);
db.shelters_persons = require("./shelters_person.model.js")(sequelize, Sequelize);

db.shelters_persons.hasMany(db.shelters);
db.shelters_persons.hasMany(db.persons);
db.persons.belongsTo(db.shelters_persons);
db.shelters.belongsTo(db.shelters_persons);

module.exports = db;
