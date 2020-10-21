module.exports = volapp => {
  const rms = require("../controllers/relationship_manager.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new note
  router.post("/:organizationId/:personId", rms.create);

  // Retrieve all notes
  router.get("/", rms.findAll);


  // Retrieve a single note with id
  router.get("/:id", rms.findOne);

  // Update a note with id
  router.put("/:id", rms.update);

  // Delete a note with id
  router.delete("/:id", rms.delete);

  // Delete all notes
  router.delete("/", rms.deleteAll);

  volapp.use('/relationship_managers', router);
};