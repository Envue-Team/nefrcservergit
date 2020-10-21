module.exports = volapp => {
  const notes = require("../controllers/note.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new note
  router.post("/", notes.create);
  // router.post("/", organizations.create);

  // Retrieve all notes
  router.get("/", notes.findAll);


  // Retrieve a single note with id
  router.get("/:id", notes.findOne);

  // Update a note with id
  router.put("/:id", notes.update);

  // Delete a note with id
  router.delete("/:id", notes.delete);

  // Delete all notes
  router.delete("/", notes.deleteAll);

  volapp.use('/notes', router);
};