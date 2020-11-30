const db = require("../models");
const DBRole = db.role;


exports.findAll = (req, res) => {
    console.log()
    DBRole.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};

