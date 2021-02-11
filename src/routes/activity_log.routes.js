module.exports = volapp => {
    const activityLog = require("../controllers/activity_log.controller.js");

    let router = require("express").Router();

    //On organization added, change all to second line
    // Create a new phone
    router.post("/", activityLog.create);

    // Retrieve all phones
    router.get("/", activityLog.findAll);
 


    volapp.use('/contacts', router); 
};