module.exports = volapp => {
  const volunteers = require("../controllers/volunteer.controller.js");

  var router = require("express").Router();

  // Create a new volunteer
  router.post("/", volunteers.create);

  // Retrieve all volunteers
  router.get("/", volunteers.findAll);

  // Retrieve all published volunteers
  router.get("/published", volunteers.findAllPublished);

  // Retrieve a single volunteer with id
  router.get("/:id", volunteers.findOne);

  // Update a volunteer with id
  router.put("/:id", volunteers.update);

  // Delete a volunteer with id
  router.delete("/:id", volunteers.delete);

  // Delete all volunteers
  router.delete("/", volunteers.deleteAll);

  volapp.use('/volunteers', router);
};