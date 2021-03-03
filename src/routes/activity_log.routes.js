module.exports = volapp => {
    const activityLog = require("../controllers/activity_log.controller.js");

    let router = require("express").Router();

    // Create a new record
    router.post("/", activityLog.create);

    // Retrieve all records
    router.get("/", activityLog.findAll); 
 

    volapp.use('/activity_logs', router); 
};