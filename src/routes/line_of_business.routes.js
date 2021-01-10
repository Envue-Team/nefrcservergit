module.exports = volapp => {
    const lines_of_business = require("../controllers/line_of_business.controller.js");

    let router = require("express").Router();

    // Create a new county
    router.post("/", lines_of_business.create);

    // Retrieve all counties
    router.get("/", lines_of_business.findAll);

    // Retrieve a single county by county id
    router.get("/:id", lines_of_business.findOne);

    // Retrieve a single county by name
    router.get("/name/:name", lines_of_business.findByName);

    // Update a county
    router.put("/:id", lines_of_business.update);

    // Delete a county
    router.delete("/:id", lines_of_business.delete);

    // Delete all counties
    router.delete("/", lines_of_business.deleteAll);

    volapp.use('/lines_of_business', router);
};