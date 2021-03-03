module.exports = volapp => {
    const oc = require("../controllers/organization_county.controller.js");

    let router = require("express").Router();

    //On organization added, change all to second line
    // Create an organization county relationship
    router.post("/", oc.create);

    // Retrieve all organizations and respective counties
    router.get("/", oc.findAll);

    // Retrieve all organization's counties
    router.get("/:organizationId", oc.findAllCounties);

    // Replace an organization's county
    router.put("/:organizationId/:countyId", oc.update);

    //Delete all organizations counties
    router.delete("/:organizationId", oc.deleteOrganizationCounties);

    // Delete an organization's county
    router.delete("/:organizationId/:countyId", oc.delete);

    // Delete all organizations' counties
    router.delete("/", oc.deleteAll);

    volapp.use('/organization_counties', router);
};