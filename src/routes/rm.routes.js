module.exports = volapp => {
  const rms = require("../controllers/relationship_manager.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new manager relationship
  router.post("/", rms.create);

  // Retrieve all manager relationships
  router.get("/", rms.findAll);

  // Retrieve all organizations relationship managers with organizationId
  router.get("/:organizationId", rms.findAllManagers);

  // Retrieve single organization relationship manager with organizationId and personId
  router.get("/:organizationId/:personId", rms.findOneOrganizationRelationshipManager);

  // Update a replace a manager
  router.put("/:organizationId/:personId", rms.update);

  // Delete a note with id
  router.delete("/:organizationId/:personId", rms.delete);

  // Delete all notes
  router.delete("/", rms.deleteAll);

  volapp.use('/relationship_managers', router);
};