module.exports = volapp => {
    const olob = require("../controllers/organization_line_of_business.controller.js");

    let router = require("express").Router();

    //On organization added, change all to second line
    // Create an organization line of business relationship
    router.post("/", olob.create);

    // Retrieve all organizations and respective lines of business
    router.get("/", olob.findAll);

    // Retrieve all organization's lines of business
    router.get("/:organizationId", olob.findAllLinesOfBusiness);

    // Replace an organization's line of business
    router.put("/:organizationId/:lobId", olob.update);

    //Delete all organizations lines of business
    router.delete("/:organizationId", olob.deleteOrganizationLinesOfBusiness);

    // Delete an organization's line of business
    router.delete("/:organizationId/:lobId", olob.delete);

    // Delete all organizations' lines of business
    router.delete("/", olob.deleteAll);

    volapp.use('/organization_lines_of_business', router);
};