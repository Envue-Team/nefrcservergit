const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expapp = express();

const db = require("../src/models");
db.sequelize.sync();

expapp.use(cors());

// parse requests of content-type - application/json
expapp.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
expapp.use(bodyParser.urlencoded({ extended: true }));

require("../src/routes/volunteer.routes")(expapp);
require("../src/routes/shelters.routes")(expapp);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

expapp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

