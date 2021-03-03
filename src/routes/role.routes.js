module.exports = volapp => {
  const roles = require("../controllers/role.controller.js");
  var router = require("express").Router();

  // Retrieve all roles
  router.get("/", roles.findAll);

  router.get("/:roleId", roles.findOne);

  volapp.use('/roles', router);
};