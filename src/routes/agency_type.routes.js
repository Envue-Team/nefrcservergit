module.exports = volapp => {
    const agency_types = require("../controllers/agency_type.controller.js");

    let router = require("express").Router();

    // Create a new agency type
    router.post("/", agency_types.create);

    // Retrieve all agency types
    router.get("/", agency_types.findAll);

    // Retrieve a single agency type by agency type id
    router.get("/:id", agency_types.findOne);

    // Retrieve a single agency type by name
    router.get("/name/:name", agency_types.findByName);

    // Update a county
    router.put("/:id", agency_types.update);

    // Delete a agency type
    router.delete("/:id", agency_types.delete);

    // Delete all agency types
    router.delete("/", agency_types.deleteAll);

    volapp.use('/agency_types', router);
};