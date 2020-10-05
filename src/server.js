const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expapp = express();

const db = require("../src/models");
db.sequelize.sync();


// var corsOptions = {
//   origin: "http://localhost:8081"
    // origin: "ec2-54-166-36-127.compute-1.amazonaws.com"
// };

// expapp.use(cors(corsOptions));
expapp.use(cors());

// parse requests of content-type - application/json
expapp.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
expapp.use(bodyParser.urlencoded({ extended: true }));

require("../src/routes/volunteer.routes")(expapp);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

expapp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

