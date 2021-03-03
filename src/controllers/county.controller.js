const db = require("../models");
const DBCounty = db.county;

// Create and Save a new email number
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "You must provide a county name"
        });
        return;
    }

    // Create a email number
    const county = {
        name: req.body.name,
    };

    // Save email number in the database
    DBCounty.create(county)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the county"
            });
        });
};

// Retrieve all email numbers from the database.
exports.findAll = (req, res) => {

    DBCounty.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving counties."
            });
        });
};

// Find a single email number with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    DBCounty.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving county with id=" + id +" err: "+err
            });
        });
};

// Find a single email number with an id
exports.findByName = (req, res) => {
    const name = req.params.name;

    DBCounty.find({
        where: {name: name}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving county with id=" + id +" err: "+err
            });
        });
};

// Update a email number by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    DBCounty.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "County was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update email with id=${id}. Maybe email was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating email with id=" + id + " err: " + err
            });
        });
};

// Delete a shelter with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    DBCounty.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "County was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete county with id=${id}. Maybe email was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete email with id=" + id + " err: " + err
            });
        });
};

// Delete all email numbers from the database.
exports.deleteAll = (req, res) => {
    DBCounty.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} counties were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all counties."
            });
        });
};

