const db = require("../models");
const DBPerson = db.person;
const DBPOC = db.pointofcontact;
const DBOrganization = db.organization;

// Create and Save a new person
exports.create = (req, res) => {
    const point_of_contact = {
        organizationId: req.body.organizationId,
        personId: req.body.personId
      }

      DBPOC.create(point_of_contact).then(data => {
        res.send(data)
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the point of contact."
        });
      });
};

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
    let organizationId = req.params.organizationId;
    DBPerson.findAll({
        include: [
            'phones',
            'emails',
            {
                model: DBOrganization,
                where:{
                    id: organizationId
                }
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving persons."
            });
        });
};

// Update a person by the id in the request
exports.update = (req, res) => {
    const personId = req.params.personId;
    const organizationId = req.params.organizationId;


    DBPOC.update(req.body, {
        where: {
            personId: personId,
            organizationId: organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "person was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update person with id=${personId} for organization id=${organizationId}. Maybe person was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot update person with id=${personId} for organization id=${organizationId} err: ${err}`
            });
        });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const personId = req.params.personId;
    const organizationId = req.params.organisationId;

    DBPOC.destroy({
        where: {
            personId: personId,
            organizationId: organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "person was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete person with id=${personId} and organization=${organizationId}. Maybe person was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot delete person with id=${personId} and organization=${organizationId}. \nErr: ${err}`
            });
        });
};

// Delete all persons from the database.
exports.deleteAll = (req, res) => {
    let organizationId = req.params.organizationId;
    DBPOC.destroy({
        where: {
            organizationId: organizationId
        },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} points of contact were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing organization's points of contact."
            });
        });
};

