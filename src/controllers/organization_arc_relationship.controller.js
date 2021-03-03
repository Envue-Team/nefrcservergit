const db = require("../models");
const DBOrganization_ArcRelationship = db.organization_arc_relationship;
const DBArcRelationship = db.arc_relationship;

// Create and Save a new organization arc relationship
exports.create = (req, res) => {
    // Validate request
    if (!req.body.arcRelationshipId || !req.body.organizationId) {
        res.status(400).send({
            message: "You must have both a relationship and organization id to assign an arc relationship to an organization"
        });
        return;
    }

    // Create a organization arc relationship
    const organization_arc_relationship = {
        arcRelationshipId: req.body.arcRelationshipId,
        organizationId: req.body.organizationId
    };

    // Save organization arc relationship
    DBOrganization_ArcRelationship.create(organization_arc_relationship)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the organization arc relationship relationship."
            });
        });
};

// Retrieve all organization arc relationships from database
exports.findAll = (req, res) => {

    DBOrganization_ArcRelationship.findAll({
        include: [
            {
                model: DBArcRelationship
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving arc relationships."
            });
        });
};

// Retrieve all organization's arc relationships
exports.findAllArcRelationships = (req, res) => {

    DBOrganization_ArcRelationship.findAll({
        where :{
            organizationId: req.params.organizationId
        },
        include: [
            {
                model: DBArcRelationship
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the organization's arc relationships."
            });
        });
};

// Update a organization arc relationship
exports.update = (req, res) => {
    DBOrganization_ArcRelationship.update(req.body, {
        where: {
            arcRelationshipId: req.params.arcRelationshipId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's arc relationship was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update organization arc relationship with organizationId=${req.params.organizationId}
                    and arcRelationshipId=${req.params.arcRelationshipId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating organization with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a all of an organization's arc relationships
exports.deleteOrganizationArcRelationships = (req, res) => {
    DBOrganization_ArcRelationship.destroy({
        where: {
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's arc relationships have been deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organizations arc relationships where organizationId=${req.params.organizationId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization arc relationships with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a specific organization arc relationship
exports.delete = (req, res) => {
    DBOrganization_ArcRelationship.destroy({
        where: {
            arcRelationshipId: req.params.arcRelationshipId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization arc relationship was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organization arc relationship with organizationId=${req.params.organizationId}
                     and arcRelationshipId=${req.params.arcRelationshipId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization arc relationship with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete all organizations' arc relationships.
exports.deleteAll = (req, res) => {
    DBOrganization_ArcRelationship.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} organization arc relationships were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all organization arc relationships."
            });
        });
};

