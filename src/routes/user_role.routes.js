module.exports = volapp => {
    const user_roles = require("../controllers/user_role.controller.js");
    var router = require("express").Router();
  
    //On organization added, change all to second line
    // Create a new phone
    // router.post("/", users.createUser);
  
    // // Retrieve all phones
    router.post("/", user_roles.create);
  
  
    // // // Retrieve a single note with id
    // router.get("/:id", users.userFindOne);
  
    router.put("/:userId/:roleId", user_roles.update);

    router.get("/:userId", user_roles.findRole);

  
    // // // Delete a note with id
    // // router.delete("/:id", users.delete);
  
    // // Delete one user
    // router.delete("/:id", users.userDelete);
  
    volapp.use('/user_roles', router);
  };