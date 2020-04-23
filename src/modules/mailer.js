const path = require("path");
const nodemailer = require("nodemailer");

const { service, user, pass} = require("../config/mail.json");

let transporter = nodemailer.createTransport({
    service, auth: { user, pass }
});

module.exports = transporter;