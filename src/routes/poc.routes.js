module.exports = volapp => {
  const pocs = require("../controllers/person.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new note
  router.post("/", pocs.createPOC);
  // router.post("/", organizations.create);

  // Retrieve all notes
  router.get("/", pocs.findAll);


  // Retrieve a single note with id
  router.get("/:id", pocs.findOne);

  // Update a note with id
  router.put("/:id", pocs.update);

  // Delete a note with id
  router.delete("/:id", pocs.delete);

  // Delete all notes
  router.delete("/", pocs.deleteAll);

  volapp.use('/pocs', router);
};