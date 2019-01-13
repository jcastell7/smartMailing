require('dotenv').config()
const nodemailer = require('nodemailer');

let smtpConfig = {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function (error, success) {
    if (error) {
        console.log("ERROR: ", error);
    } else {
        console.log('Server is ready to take our messages');
        console.log(success);
    }
});

let mailOptions = {
    from: '"Fred Foo 👻" <jcastell7@cuc.edu.co>', // sender address
    to: 'jtcp27031@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log('message was sent correctly');
        console.log(info);
    }
});