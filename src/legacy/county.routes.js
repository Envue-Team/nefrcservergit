module.exports = volapp => {
  const counties = require("../controllers/county.controller.js");

  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new note
  router.post("/", counties.create);
  // router.post("/", organizations.create);

  // Retrieve all notes
  router.get("/", counties.findAll);


  // Retrieve a single note with id
  router.get("/:id", counties.findOne);

  // Update a note with id
  router.put("/:id", counties.update);

  // Delete a note with id
  router.delete("/:id", counties.delete);

  // Delete all notes
  router.delete("/", counties.deleteAll);

  volapp.use('/counties', router);
};