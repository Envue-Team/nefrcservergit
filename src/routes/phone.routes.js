module.exports = volapp => {
  const phones = require("../controllers/phone.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new phone
  router.post("/", phones.create);

  // Retrieve all phones
  router.get("/", phones.findAll);


  // Retrieve a single note with id
  router.get("/:id", phones.findOne);

  // Update a note with id
  router.put("/:id", phones.update);

  // Delete a note with id
  router.delete("/:id", phones.delete);

  // Delete all notes
  router.delete("/", phones.deleteAll);

  volapp.use('/phones', router);
};