module.exports = volapp => {
    const organization_arc_relationships = require("../controllers/organization_arc_relationship.controller");

    let router = require("express").Router();

    //On organization added, change all to second line
    // Create an organization organization arc relationship relationship
    router.post("/", organization_arc_relationships.create);

    // Retrieve all organizations and respective arc relationships
    router.get("/", organization_arc_relationships.findAll);

    // Retrieve all organization's arc relationships
    router.get("/:organizationId", organization_arc_relationships.findAllArcRelationships);

    // Replace an organization's arc relationship
    router.put("/:organizationId/:arcRelationshipId", organization_arc_relationships.update);

    //Delete all organizations arc relationships
    router.delete("/:organizationId", organization_arc_relationships.deleteOrganizationArcRelationships);

    // Delete an organization's arc relationship
    router.delete("/:organizationId/:arcRelationshipId", organization_arc_relationships.delete);

    // Delete all organizations' arc relationships
    router.delete("/", organization_arc_relationships.deleteAll);

    volapp.use('/organization_arc_relationships', router);
};