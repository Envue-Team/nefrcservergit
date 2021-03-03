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

// Find a single role by id
exports.findOne = (req, res) => {
    console.log("called");
    let id = req.params.roleId;
    DBRole.findByPk(id, {
        include :[
            'permissions',
        ]
    })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving role with id=" + id +" err: "+err
            });
        });
};
