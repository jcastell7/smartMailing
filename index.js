var nodemailer = require('nodemailer');

let smtpConfig = {
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'jcastell7@cuc.edu.co',
        pass: 'echo"jcastell7"'
    },
    requireTLS:     true
};

var transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function(error, success) {
    if (error) {
         console.log("ERROR: ",error);
    } else {
         console.log('Server is ready to take our messages');
         console.log(success);
    }
 });

 let message = {
    from: 'jcatell7@cuc.edu.co', // listed in rfc822 message header
    to: 'jtcp27031@gmail.com', // listed in rfc822 message header
    subject: 'this is a test message',
    text: 'this mail was sent from my nodejs app created with nodemailer',
    envelope: {
        from: 'Daemon <jcatell7@cuc.edu.co>', // used as MAIL FROM: address for SMTP
        to: 'jtcp27031@gmail.com, Mailer <jtcp27031@gmail.com>' // used as RCPT TO: address for SMTP
    }
}

transporter.sendMail(message,function(err, info){
    if (err) {
        console.log(err);
   } else {
        console.log('message was sent correctly');
        console.log(info);
   }
});