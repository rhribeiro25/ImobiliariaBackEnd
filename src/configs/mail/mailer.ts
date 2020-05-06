import nodemailer from 'nodemailer';
import mailConfig from './mailConfig';

const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: { user: mailConfig.user, pass: mailConfig.pass },
});

export default transporter;
