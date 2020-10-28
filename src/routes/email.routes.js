module.exports = volapp => {
  const emails = require("../controllers/email.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new phone
  router.post("/", emails.create);

  // Retrieve all phones
  router.get("/", emails.findAll);


  // Retrieve a single note with id
  router.get("/:id", emails.findOne);

  // Update a note with id
  router.put("/:id", emails.update);

  // Delete a note with id
  router.delete("/:id", emails.delete);

  // Delete all notes
  router.delete("/", emails.deleteAll);

  volapp.use('/emails', router);
};