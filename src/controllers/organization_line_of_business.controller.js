const db = require("../models");
const DBOrganization_LOB = db.organization_lines_of_busines;
const DBLOB = db.line_of_business;

// Create and Save a new organization line of business
exports.create = (req, res) => {
    // Validate request
    if (!req.body.lineOfBusinessId || !req.body.organizationId) {
        res.status(400).send({
            message: "You must have both a line of business and organization id to assign a line of business to an organization"
        });
        return;
    }

    // Create a organization lob
    const organization_lob = {
        lineOfBusinessId: req.body.lineOfBusinessId,
        organizationId: req.body.organizationId
    };

    // Save organization lob
    DBOrganization_LOB.create(organization_lob)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the organization line of business relationship."
            });
        });
};

// Retrieve all organization lines of business from database
exports.findAll = (req, res) => {

    DBOrganization_LOB.findAll({
        include: [
            {
                model: DBLOB
            }
        ]
    })
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

// Retrieve all organization's lines of business
exports.findAllLinesOfBusiness = (req, res) => {

    DBOrganization_LOB.findAll({
        where :{
            organizationId: req.params.organizationId
        },
        include: [
            {
                model: DBLOB
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the organizations lines of business."
            });
        });
};

// Update a organization lob
exports.update = (req, res) => {
    DBOrganization_LOB.update(req.body, {
        where: {
            lineOfBusinessId: req.params.lineOfBusinessId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's line of business was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update organization line of business with organizationId=${req.params.organizationId}
                    and lineOfBusinessId=${req.params.lineOfBusinessId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating organization with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a all of an organization's lines of business
exports.deleteOrganizationLinesOfBusiness = (req, res) => {
    DBOrganization_LOB.destroy({
        where: {
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's lines of business have been deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organizations lines of business where organizationId=${req.params.organizationId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization lines of business with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a specific organization lob
exports.delete = (req, res) => {
    DBOrganization_LOB.destroy({
        where: {
            lineOfBusinessId: req.params.lineOfBusinessId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization line of business was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organization line of business with organizationId=${req.params.organizationId}
                     and lineOfBusinessId=${req.params.lineOfBusinessId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization line of business with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete all organizations' lines of business.
exports.deleteAll = (req, res) => {
    DBOrganization_LOB.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} organization lines of business were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all organization lines of business."
            });
        });
};

