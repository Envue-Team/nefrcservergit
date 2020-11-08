module.exports = volapp => {
  const organizations = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new shelter
  router.post("/", organizations.createRelationship);

  // Retrieve all shelters
  router.get("/", organizations.findAllRelationships);

  // Retrieve a single volunteer with id
  router.get("/:id", organizations.findOneRelationship);

  // Update a partner with id
  router.put("/:id", organizations.updateRelationship);

  // Delete a volunteer with id
  router.delete("/:id", organizations.delete);

  // Delete all shelters
  router.delete("/", organizations.deleteAll);

  volapp.use('/relationships', router);
};