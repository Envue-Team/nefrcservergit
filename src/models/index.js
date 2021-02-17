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
db.county = require('./county.model.js')(sequelize, Sequelize);
db.organization_county = require('./organization_county.model.js')(sequelize, Sequelize);
db.line_of_business = require('./line_of_business.js')(sequelize, Sequelize);
db.organization_lines_of_busines = require('./organization_lines_of_business.model.js')(sequelize, Sequelize);
db.arc_relationship = require('./arc_relationship.model')(sequelize, Sequelize);
db.agency_type = require('./agency_type.model')(sequelize, Sequelize);
db.organization_agency_type = require('./organization_agency_type.model')(sequelize, Sequelize);
db.organization_arc_relationship = require('./organization_arc_relationship.model')(sequelize, Sequelize);
//test addition for activity log
// db.activity_log = require('./activity_log.model')(sequelize, Sequelize);


//Relationship building
// db.organization.hasMany(db.note, {onDelete: 'CASCADE'});
// db.note.belongsTo(db.organization);
db.person.hasMany(db.note);
db.note.belongsTo(db.person);
db.organization.hasOne(db.partner, {onDelete: 'CASCADE'});
db.partner.belongsTo(db.organization);
db.organization.hasOne(db.relationship, {onDelete: 'CASCADE'});
db.relationship.belongsTo(db.organization);
db.organization.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.organization);
db.person.hasMany(db.phone, {onDelete: 'CASCADE'});
db.phone.belongsTo(db.person);
db.organization.hasMany(db.email, {onDelete: 'CASCADE'});
db.email.belongsTo(db.organization);
db.person.hasMany(db.email, {onDelete: 'CASCADE'});
db.email.belongsTo(db.person);
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
db.organization.belongsToMany(db.county, {through: db.organization_county});
db.county.belongsToMany(db.organization, {through: db.organization_county});
db.organization.belongsToMany(db.line_of_business, {through: db.organization_lines_of_busines});
db.line_of_business.belongsToMany(db.organization, {through: db.organization_lines_of_busines});
db.organization.belongsToMany(db.arc_relationship, {through: db.organization_arc_relationship});
db.arc_relationship.belongsToMany(db.organization, {through: db.organization_arc_relationship});
db.organization.belongsToMany(db.agency_type, {through: db.organization_agency_type});
db.agency_type.belongsToMany(db.organization, {through: db.organization_agency_type});
db.role.belongsToMany(db.permission, {through: db.role_permissions});
db.permission.belongsToMany(db.role, {through: db.role_permissions});
db.organization.belongsToMany(db.person, {through: db.pointofcontact});
db.person.belongsToMany(db.organization, {through: db.pointofcontact});

module.exports = db;
