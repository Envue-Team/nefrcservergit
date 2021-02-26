module.exports = volapp => {
    const mailer = require("../controllers/mailer.controller.js");
    var router = require("express").Router();

    // Send
    router.post("/", mailer.sendMail);

    volapp.use('/emailer', router);
}