import * as config from "../models/config"
const nodemailer = require('nodemailer');

const mail = "";

const createMailer = async () => {
    let smtpConfig = {
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        tls: {
            ciphers:'SSLv3'
        }
    };
    
    let user = await config.getConfig().catch(error => {
        console.error(error);
        alert("Ha ocurrido un error al obtener usuario y contraseña");
    });
    mail = user.smtp_mail;
    smtpConfig.auth = {
        user: mail,
        pass: user.smtp_password
    }

    return nodemailer.createTransport(smtpConfig);
}


export const sendMail = async (task) => {
    let mailOptions = {
        from: mail, // sender address
        to: task.contacts.join(","), // list of receivers
        subject: task.subject, // Subject line
        text: task.message, // plain text body
        //html: '<b>Hello world?</b>' // html body
    };
    let transporter = await createMailer();
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('message was sent correctly');
            console.log(info);
        }
    });
}