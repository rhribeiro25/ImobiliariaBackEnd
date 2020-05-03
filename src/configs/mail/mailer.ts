import nodemailer from "nodemailer";

const { service, user, pass} = require("@config/mail/mail.ts");

let transporter = nodemailer.createTransport({
    service, auth: { user, pass }
});

export default transporter;