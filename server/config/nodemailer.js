const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.mailgun.org',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = ({ toAddress, replyTo = null, subject, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: toAddress,
        replyTo: replyTo ? replyTo : process.env.EMAIL_ADDRESS,
        subject: subject,
        html: html
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;