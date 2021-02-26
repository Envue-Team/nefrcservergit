const nodemailer = require('nodemailer');

// Create and Save a new email number
exports.sendMail = (req, res) => {
    console.log("called");
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "team.envue@gmail.com", // generated ethereal user
            pass: "somepass", // generated ethereal password
        },
    });

    let info = transporter.sendMail({
        from: '"Envue 👻" <team.envue@gmail.com>', // sender address
        to: "n01385552@unf.edu; n001916743@unf.edu: n00121210@unf.edu",
        subject: "Test Succeeded ✔", // Subject line
        text: "Successful email", // plain text body
        html: "<b>Ok, y'all can go ahead and do the rest. It's posted to git.</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
};