const db = require("../models");
const DBLineOfBusiness = db.line_of_business;

// Create and Save a new email number
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "You must provide a line of business name"
        });
        return;
    }

    // Create a email number
    const line_of_business = {
        name: req.body.name,
    };

    // Save email number in the database
    DBLineOfBusiness.create(line_of_business)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the line of business"
            });
        });
};

// Retrieve all email numbers from the database.
exports.findAll = (req, res) => {

    DBLineOfBusiness.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lines of business."
            });
        });
};

// Find a single email number with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    DBLineOfBusiness.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving line of business with id=" + id +" err: "+err
            });
        });
};

// Find a single email number with an id
exports.findByName = (req, res) => {
    const name = req.params.name;

    DBLineOfBusiness.find({
        where: {name: name}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving line of business with id=" + id +" err: "+err
            });
        });
};

// Update a email number by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    DBLineOfBusiness.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Line of business was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update line of business with id=${id}. Maybe it was not found or req.body is empty!`
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

    DBLineOfBusiness.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Line of business was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete line of business with id=${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete line of business with id=" + id + " err: " + err
            });
        });
};

// Delete all email numbers from the database.
exports.deleteAll = (req, res) => {
    DBLineOfBusiness.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} lines of business were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all lines of business."
            });
        });
};

