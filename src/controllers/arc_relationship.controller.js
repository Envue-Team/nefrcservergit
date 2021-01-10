const db = require("../models");
const DBArcRelationship = db.arc_relationship;

// Create and Save a relationship
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "You must provide a relationship name"
        });
        return;
    }

    // Create a relationship
    const relationship = {
        name: req.body.name,
    };

    // Save relationship in the database
    DBArcRelationship.create(relationship)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the relationship"
            });
        });
};

// Retrieve all relationships from the database.
exports.findAll = (req, res) => {

    DBArcRelationship.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving relationships."
            });
        });
};

// Find a single arc relationship with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    DBArcRelationship.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving relationships with id=" + id +" err: "+err
            });
        });
};

// Find a single arc relationship with an id
exports.findByName = (req, res) => {
    const name = req.params.name;

    DBArcRelationship.find({
        where: {name: name}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving relationship with id=" + id +" err: "+err
            });
        });
};

// Update a arc relationship by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    DBArcRelationship.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Relationship was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update relationship with id=${id}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating relationship with id=" + id + " err: " + err
            });
        });
};

// Delete an arc relationship with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    DBArcRelationship.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Relationship was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete relationship with id=${id}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete it with id=" + id + " err: " + err
            });
        });
};

// Delete all arc relationships from the database.
exports.deleteAll = (req, res) => {
    DBArcRelationship.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} relationships were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all relationships."
            });
        });
};

