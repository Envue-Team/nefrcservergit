module.exports = volapp => {
    const users = require("../controllers/person.controller.js");
  
    var router = require("express").Router();
  
    //On organization added, change all to second line
    // Create a new phone
    router.post("/", users.createUser);
  
    // // Retrieve all phones
    router.get("/", users.userFindAll);

    //Retrieve user by email
    // router.get("/email/:email", users.findByEmail);
  
  
    // // Retrieve a single note with id
    router.get("/:id", users.userFindOne);
  
    router.put("/:id", users.updateUser);
  
    // // Delete a note with id
    // router.delete("/:id", users.delete);
  
    // Delete one user
    router.delete("/:id", users.userDelete);
  
    volapp.use('/users', router);
  };