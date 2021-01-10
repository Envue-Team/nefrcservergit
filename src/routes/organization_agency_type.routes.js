module.exports = volapp => {
    const organization_agency_types = require("../controllers/organization_agency_type.controller");

    let router = require("express").Router();

    //On organization added, change all to second line
    // Create an organization agency type relationship
    router.post("/", organization_agency_types.create);

    // Retrieve all organizations and respective agency types
    router.get("/", organization_agency_types.findAll);

    // Retrieve all organization's agency types
    router.get("/:organizationId", organization_agency_types.findAllOrganizationAgencyTypes);

    // Replace an organization's agency type
    router.put("/:organizationId/:agencyTypeId", organization_agency_types.update);

    //Delete all organizations agency types
    router.delete("/:organizationId", organization_agency_types.deleteOrganizationAgencyTypes);

    // Delete an organization's agency type
    router.delete("/:organizationId/:countyId", organization_agency_types.delete);

    // Delete all organizations' agency types
    router.delete("/", organization_agency_types.deleteAll);

    volapp.use('/organization_agency_types', router);
};