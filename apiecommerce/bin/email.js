const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER_GMAIL, // hay que activar en Google el inicio de sesión en apps menos seguras
        pass: process.env.NODEMAILER_PASSWORD_GMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;