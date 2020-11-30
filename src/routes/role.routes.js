module.exports = volapp => {
  const roles = require("../controllers/role.controller.js");
  var router = require("express").Router();

  //On organization added, change all to second line
  // Create a new phone
  // router.post("/", users.createUser);

  // // Retrieve all phones
  router.get("/", roles.findAll);


  // // // Retrieve a single note with id
  // router.get("/:id", users.userFindOne);

  // router.put("/:id", users.updateUser);

  // // // Delete a note with id
  // // router.delete("/:id", users.delete);

  // // Delete one user
  // router.delete("/:id", users.userDelete);

  volapp.use('/roles', router);
};