module.exports = volapp => {
    const arc_relationships = require("../controllers/arc_relationship.controller.js");

    let router = require("express").Router();

    // Create a new arc relationship
    router.post("/", arc_relationships.create);

    // Retrieve all arc relationships
    router.get("/", arc_relationships.findAll);

    // Retrieve a single arc relationship by arc relationship id
    router.get("/:id", arc_relationships.findOne);

    // Retrieve a single arc relationship by name
    router.get("/name/:name", arc_relationships.findByName);

    // Update an arc relationship
    router.put("/:id", arc_relationships.update);

    // Delete an arc relationship
    router.delete("/:id", arc_relationships.delete);

    // Delete all arc relationships
    router.delete("/", arc_relationships.deleteAll);

    volapp.use('/arc_relationships', router);
};