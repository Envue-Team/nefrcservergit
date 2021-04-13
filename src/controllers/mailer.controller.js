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

    transporter.sendMail({
        from: '"RM Portal Admin" <Rachael.Broadwater@redcross.org>', // sender address
        to: req.body.sendTo,
        subject: req.body.subject, // Subject line
        html: req.body.html, // html body
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while sending email "
            });
        });
};

