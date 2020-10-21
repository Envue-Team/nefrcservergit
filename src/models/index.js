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
db.organization = require("./organization.model.js")(sequelize, Sequelize);
db.note = require("./note.model.js")(sequelize, Sequelize);
db.partner = require("./partner.model.js")(sequelize, Sequelize);
db.phone = require("./phone.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);

//Relationship building
db.organization.hasMany(db.note, {onDelete: 'CASCADE'});
db.note.belongsTo(db.organization);
db.organization.hasOne(db.partner, {onDelete: 'CASCADE'});
db.partner.belongsTo(db.organization);
db.organization.hasMany(db.person);
db.person.belongsTo(db.organization);
db.organization.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.organization);
db.person.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.person);


module.exports = db;
