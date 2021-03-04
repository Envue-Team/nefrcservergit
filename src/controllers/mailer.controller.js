const nodemailer = require('nodemailer');

// Create and Save a new email number
exports.sendMail = (req, res) => {
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
        to: req.body.sendTo,
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: req.body.html, // html body
    });
    console.log("Message sent: %s", info.messageId);
};