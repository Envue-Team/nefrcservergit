const db = require("../models");
const DBAgencyType = db.agency_type;

// Create and Save a new agency type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "You must provide an agency type name"
        });
        return;
    }

    // Create an agency type
    const agencyType = {
        name: req.body.name,
    };

    // Save agency type in the database
    DBAgencyType.create(agencyType)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the agencyType"
            });
        });
};

// Retrieve all agency types from the database.
exports.findAll = (req, res) => {

    DBAgencyType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving agency types."
            });
        });
};

// Find a single agency type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    DBAgencyType.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving agency type with id=" + id +" err: "+err
            });
        });
};

// Find a single agency type with an id
exports.findByName = (req, res) => {
    const name = req.params.name;

    DBAgencyType.find({
        where: {name: name}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving agency type with id=" + id +" err: "+err
            });
        });
};

// Update an agency type by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    DBAgencyType.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Agency type was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update agency type with id=${id}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating agency type with id=" + id + " err: " + err
            });
        });
};

// Delete an agency type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    DBAgencyType.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Agency type was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete agency type with id=${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete agency type with id=" + id + " err: " + err
            });
        });
};

// Delete all agency types from the database.
exports.deleteAll = (req, res) => {
    DBAgencyType.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} agency types were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all agency types."
            });
        });
};

