module.exports = volapp => {
    const counties = require("../controllers/county.controller.js");

    let router = require("express").Router();

    // Create a new county
    router.post("/", counties.create);

    // Retrieve all counties
    router.get("/", counties.findAll);

    // Retrieve a single county by county id
    router.get("/:id", counties.findOne);

    // Retrieve a single county by name
    router.get("/name/:name", counties.findByName);

    // Update a county
    router.put("/:id", counties.update);

    // Delete a county
    router.delete("/:id", counties.delete);

    // Delete all counties
    router.delete("/", counties.deleteAll);

    volapp.use('/counties', router);
};