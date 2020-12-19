const db = require("../models");
const DBOrganization_County = db.organization_county;
const DBCounty = db.county;

// Create and Save a new organization county
exports.create = (req, res) => {
    // Validate request
    if (!req.body.countyId || !req.body.organizationId) {
        res.status(400).send({
            message: "You must have both a county and organization id to assign a county to an organization"
        });
        return;
    }

    // Create a organization county
    const organization_county = {
        countyId: req.body.countyId,
        organizationId: req.body.organizationId
    };

    // Save organization county
    DBOrganization_County.create(organization_county)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the organization county relationship."
            });
        });
};

// Retrieve all organization counties from database
exports.findAll = (req, res) => {

    DBOrganization_County.findAll({
        include: [
            {
                model: DBCounty
            }
        ]
    })
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

// Retrieve all organization's counties
exports.findAllCounties = (req, res) => {

    DBOrganization_County.findAll({
        where :{
            organizationId: req.params.organizationId
        },
        include: [
            {
                model: DBCounty
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the organizations counties."
            });
        });
};

// Update a organization county
exports.update = (req, res) => {
    DBOrganization_County.update(req.body, {
        where: {
            countyId: req.params.countyId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's county was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update organization county with organizationId=${req.params.organizationId}
                    and countyId=${req.params.countyId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating organization with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a all of an organization's counties
exports.deleteOrganizationCounties = (req, res) => {
    DBOrganization_County.destroy({
        where: {
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's counties were deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organizations counties where organizationId=${req.params.organizationId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization county with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a specific organization county
exports.delete = (req, res) => {
    DBOrganization_County.destroy({
        where: {
            countyId: req.params.countyId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization county was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organization county with organizationId=${req.params.organizationId}
                     and countyId=${req.params.countyId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization county with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete all organizations' counties.
exports.deleteAll = (req, res) => {
    DBOrganization_County.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} organization counties were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all organization counties."
            });
        });
};

