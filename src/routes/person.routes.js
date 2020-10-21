module.exports = volapp => {
  const persons = require("../controllers/person.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new phone
  router.post("/", persons.create);

  // Retrieve all phones
  router.get("/", persons.findAll);


  // Retrieve a single note with id
  router.get("/:id", persons.findOne);

  // Update a note with id
  router.put("/:id", persons.update);

  // Delete a note with id
  router.delete("/:id", persons.delete);

  // Delete all notes
  router.delete("/", persons.deleteAll);

  volapp.use('/persons', router);
};