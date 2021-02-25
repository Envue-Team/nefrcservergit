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
            pass: "password", // generated ethereal password
        },
    });

    let info = transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
};