const db = require("../models");
const DBRolePermissions = db.role_permissions;
const DBPermission = db.permission;

// Create and Save a new role permission
exports.create = (req, res) => {
    // Validate request
    if (!req.body.roleId || !req.body.permissionId) {
        res.status(400).send({
            message: "You must have both a role and permission id to assign a permission to a role"
        });
        return;
    }

    // Create a role permission
    const role_permission = {
        roleId: req.body.roleId,
        permissionId: req.body.permissionId
    };

    // Save role permission
    DBRolePermissions.create(role_permission)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the role permission relationship."
            });
        });
};

// Retrieve all permissions from database
exports.findAll = (req, res) => {

    DBPermission.findAll({
        include: [
            {
                model: DBPermission
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving permissions."
            });
        });
};

// Retrieve all role's permissions
exports.findAllRolePermissions = (req, res) => {

    DBRolePermissions.findAll({
        where :{
            roleId: req.params.roleId
        },
        include: [
            {
                model: DBPermission
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the role's permissions."
            });
        });
};

// Update a role's permission
exports.update = (req, res) => {
    DBRolePermissions.update(req.body, {
        where: {
            roleId: req.params.roleId,
            permissionId: req.params.permissionId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role's permisson was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update role permission with roleId=${req.params.roleId}
                    and permissionId=${req.params.permissionId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating role with roleId=" + req.params.roleId + " err: " + err
            });
        });
};

// Delete all of a role's permissions
exports.deleteRolePermissions = (req, res) => {
    DBRolePermissions.destroy({
        where: {
            roleId: req.params.roleId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role's permissions were deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete role's permissions where roleId=${req.params.roleId}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete role permission with roleId=" + req.params.roleId + " err: " + err
            });
        });
};

// Delete a specific role permission
exports.delete = (req, res) => {
    DBRolePermissions.destroy({
        where: {
            roleId: req.params.roleId,
            permissionId: req.params.permissionId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role permission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete role permission with roleId=${req.params.roleId}
                     and permissionId=${req.params.permissionId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete role permission with roleId=" + req.params.roleId + " err: " + err
            });
        });
};

// Delete all role permissions.
exports.deleteAll = (req, res) => {
    DBRolePermissions.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} role permissions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all role permissions."
            });
        });
};

