const db = require("../models");
const DBOrganization_AgencyType = db.organization_agency_type;
const DBAgencyType = db.agency_type;

// Create and Save a new organization agency type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.agencyTypeId || !req.body.organizationId) {
        res.status(400).send({
            message: "You must have both a county and organization id to assign an agency type to an organization"
        });
        return;
    }

    // Create a organization agency type
    const organization_agency_type = {
        agencyTypeId: req.body.agencyTypeId,
        organizationId: req.body.organizationId
    };

    // Save organization agency type
    DBOrganization_AgencyType.create(organization_agency_type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the organization agency type relationship."
            });
        });
};

// Retrieve all organization agency types from database
exports.findAll = (req, res) => {

    DBOrganization_AgencyType.findAll({
        include: [
            {
                model: DBAgencyType
            }
        ]
    })
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

// Retrieve all organization's agency types
exports.findAllOrganizationAgencyTypes = (req, res) => {

    DBOrganization_AgencyType.findAll({
        where :{
            organizationId: req.params.organizationId
        },
        include: [
            {
                model: DBAgencyType
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the organizations agency types."
            });
        });
};

// Update a organization county
exports.update = (req, res) => {
    DBOrganization_AgencyType.update(req.body, {
        where: {
            agencyTypeId: req.params.agencyTypeId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's agency type was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update organization agency type with organizationId=${req.params.organizationId}
                    and agencyTypeId=${req.params.agencyTypeId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating organization with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a all of an organization's agency types
exports.deleteOrganizationAgencyTypes = (req, res) => {
    DBOrganization_AgencyType.destroy({
        where: {
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization's agency types were deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organizations agency types where organizationId=${req.params.organizationId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization agency type with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete a specific organization county
exports.delete = (req, res) => {
    DBOrganization_AgencyType.destroy({
        where: {
            agencyTypeId: req.params.agencyTypeId,
            organizationId: req.params.organizationId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Organization agency type was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete organization agency type with organizationId=${req.params.organizationId}
                     and agencyTypeId=${req.params.agencyTypeId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete organization agency type with organizationId=" + req.params.organizationId + " err: " + err
            });
        });
};

// Delete all organizations' counties.
exports.deleteAll = (req, res) => {
    DBOrganization_AgencyType.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} organization agency types were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all organization agency types."
            });
        });
};

