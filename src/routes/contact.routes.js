module.exports = volapp => {
    const contacts = require("../controllers/person.controller.js");

    var router = require("express").Router();

    //On organization added, change all to second line
    // Create a new phone
    router.post("/", contacts.create);

    // Retrieve all phones
    router.get("/", contacts.contactFindAll);


    // Retrieve a single note with id
    router.get("/:id", contacts.findOne);

    // Update a note with id
    router.put("/:id", contacts.update);

    // Delete a note with id
    router.delete("/:id", contacts.delete);

    // Delete all notes
    router.delete("/", contacts.contactDeleteAll);

    volapp.use('/contacts', router);
};