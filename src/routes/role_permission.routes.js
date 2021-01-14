module.exports = volapp => {
    const rp = require("../controllers/role_permission.controller.js");

    let router = require("express").Router();
    
    // Create an role permission relationship
    router.post("/", rp.create);

    // Retrieve all roles and their respective permissions
    router.get("/", rp.findAll);

    // Retrieve all role's permissions
    router.get("/:roleId", rp.findAllRolePermissions);

    // Replace a role's permission
    router.put("/:roleId/:permissionId", rp.update);

    //Delete all role's permissions
    router.delete("/:roleId", rp.deleteRolePermissions);

    // Delete a role's permission
    router.delete("/:roleId/:permissionId", rp.delete);

    // Delete all roles permissions
    router.delete("/", rp.deleteAll);

    volapp.use('/role_permissions', router);
};