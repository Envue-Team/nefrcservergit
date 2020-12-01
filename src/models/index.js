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
db.pointofcontact = require("./poc.model.js")(sequelize, Sequelize);
db.relationshipmanager = require("./relationship_manager.model.js")(sequelize, Sequelize);
db.relationship = require("./relationship.model.js")(sequelize, Sequelize);
db.email = require("./email.model.js")(sequelize, Sequelize);
db.file = require("./file.model.js")(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.permission = require('./permission.model.js')(sequelize, Sequelize);
db.user_roles = require('./user_roles.model.js')(sequelize, Sequelize);
db.role_permissions = require('./role_permissions.model.js')(sequelize, Sequelize);

//Relationship building
db.organization.hasMany(db.note, {onDelete: 'CASCADE'});
db.note.belongsTo(db.organization);
db.person.hasMany(db.note);
db.note.belongsTo(db.person);
db.organization.hasOne(db.partner, {onDelete: 'CASCADE'});
db.partner.belongsTo(db.organization);
db.organization.hasOne(db.relationship, {onDelete: 'CASCADE'});
db.relationship.belongsTo(db.organization);
// db.organization.hasMany(db.person);
// db.person.belongsTo(db.organization);
db.organization.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.organization);
db.person.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.person);
db.organization.hasMany(db.email, {onDelete: 'CASCADE'});
db.email.belongsTo(db.organization);
db.person.hasMany(db.email, {onDelete: 'CASCADE'});
db.email.belongsTo(db.person);
// db.organization.hasMany(db.pointofcontact, {onDelete: 'CASCADE'});
// db.pointofcontact.belongsTo(db.organization);
// db.person.hasMany(db.pointofcontact, {onDelete: 'CASCADE'});
// db.pointofcontact.belongsTo(db.person);
db.organization.belongsToMany(db.person, {through: db.pointofcontact});
db.person.belongsToMany(db.organization, {through: db.pointofcontact});
db.organization.hasMany(db.relationshipmanager, {onDelete: 'CASCADE'});
db.relationshipmanager.belongsTo(db.organization);
db.person.hasMany(db.relationshipmanager, {onDelete: 'CASCADE'});
db.relationshipmanager.belongsTo(db.person);
db.organization.hasMany(db.file);
db.file.belongsTo(db.organization);
db.person.hasMany(db.file);
db.file.belongsTo(db.person);
db.user.belongsTo(db.person);
db.person.hasOne(db.user);
db.user.belongsToMany(db.role, { through: db.user_roles });
db.permission.belongsToMany(db.role, { through: db.role_permissions});


module.exports = db;
