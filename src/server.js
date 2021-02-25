const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');

const expapp = express();

const db = require("../src/models");
// db.sequelize.sync({force: true});
db.sequelize .sync();

expapp.use(cors());

// parse requests of content-type - application/json
expapp.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
expapp.use(bodyParser.urlencoded({ extended: true })); 

require("../src/routes/organization.routes")(expapp);
require("../src/routes/note.routes")(expapp);
require("../src/routes/partner.routes")(expapp);
require("../src/routes/phone.routes")(expapp);
require("../src/routes/person.routes")(expapp);
require("../src/routes/poc.routes")(expapp);
require("../src/routes/rm.routes")(expapp);
require("../src/routes/relationship.routes")(expapp);
require("../src/routes/email.routes")(expapp);
require("../src/routes/file.routes")(expapp);
require("../src/routes/user.routes")(expapp);
require("../src/routes/role.routes")(expapp);
require("../src/routes/user_role.routes")(expapp);
require("../src/routes/contact.routes")(expapp);
require("../src/routes/organization_county.routes")(expapp);
require("../src/routes/county.routes")(expapp);
require("../src/routes/line_of_business.routes")(expapp);
require("../src/routes/organization_line_of_business.routes")(expapp);
require("../src/routes/agency_type.routes")(expapp);
require("../src/routes/organization_agency_type.routes")(expapp);
require("../src/routes/arc_relationship.routes")(expapp);
require("../src/routes/organization_arc_relationship.routes")(expapp);
require("../src/routes/role_permission.routes")(expapp);
require("../src/routes/activity_log.routes")(expapp);
require("../src/routes/mailer.routes")(expapp);


// set port, listen for requests
const PORT = process.env.PORT || 8080;

expapp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

