module.exports = volapp => {
  const shelters = require("../controllers/shelter.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new shelter
  router.post("/", shelters.create);
  // router.post("/", organizations.create);

  // Retrieve all shelters
  router.get("/", shelters.findAll);

  // Retrieve all published shelters
  router.get("/published", shelters.findAllPublished);

  // Retrieve a single volunteer with id
  router.get("/:id", shelters.findOne);

  // Update a volunteer with id
  router.put("/:id", shelters.update);

  // Delete a volunteer with id
  router.delete("/:id", shelters.delete);

  // Delete all shelters
  router.delete("/", shelters.deleteAll);

  volapp.use('/shelters', router);
};