module.exports = volapp => {
  const pocs = require("../controllers/poc.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new note
  router.post("/", pocs.create);

  // Retrieve all notes
  router.get("/:organizationId", pocs.findAll);

  // Update a note with id
  router.put("/:organizationId/:personId", pocs.update);

  // Delete a note with id
  router.delete("/:id", pocs.delete);

  // Delete all notes
  router.delete("/", pocs.deleteAll);

  volapp.use('/pocs', router);
};