module.exports = volapp => {
  const organizations = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new shelter
  router.post("/", organizations.create);
  // router.post("/", organizations.create);

  // Retrieve all shelters
  router.get("/", organizations.findAll);

  // Retrieve a single volunteer with id
  router.get("/:id", organizations.findOne);

  // Update a volunteer with id
  router.put("/:id", organizations.update);

  // Delete a volunteer with id
  router.delete("/:id", organizations.delete);

  // Delete all shelters
  router.delete("/", organizations.deleteAll);

  volapp.use('/organizations', router);
};