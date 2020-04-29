const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const UserRepository = require('../repositories/userRepository');
const hbs = require("nodemailer-express-handlebars");
const mailer = require("../../modules/mailer");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { mailOptions, hbsOptions } = require("../../config/mail_forgot_password.json");

exports.create = async function (req) {
    let newUser = req.body;
    newUser.pass = await this.EncryptPassword(newUser.pass);
    let user = await UserRepository.create(newUser);
    user.pass = undefined;
    return user;
}

exports.findByMail = async function (email, selectAttributes) {
    return await UserRepository.findByMail(email, selectAttributes);
}

exports.findAll = async function () {
    return await UserRepository.findAll();
}

exports.findAll = async function () {
    return await UserRepository.findAll();
}

exports.findById = async function (id) {
    return await UserRepository.findById(id);
}

exports.findByIdAndRemove = async function (id) {
    return await UserRepository.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (req, actionsJson) {
    const { body } = req;
    let newUser = body;
    newUser.upAt = Date.now();
    return await UserRepository.findByIdAndUpdate(req.params.id, { $set: newUser }, actionsJson);

}

exports.sendMailRecoveryPassword = async function (params) {
    const { email, token } = params;
    mailOptions.to = email;
    mailOptions.context.token = token;
    mailer.use("compile", hbs(hbsOptions));
    await mailer.sendMail(mailOptions);
}

exports.updateTokenExpires = async function (id) {
    const token = crypto.randomBytes(20).toString("hex");
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    await UserRepository.findByIdAndUpdate(id, { "$set": { resetToken: token, resetExpires: expiresIn } });
    return token;
}

exports.updatePassword = async function (id, pass) {
    const upAt = Date.now();
    pass = await this.EncryptPassword(pass);
    await UserRepository.findByIdAndUpdate(id, { "$set": { pass, upAt } });
}

exports.isAuthenticated = async function (pass, hash) {
    return await bcrypt.compare(pass, hash);
}

exports.EncryptPassword = async function (pass) {
    var salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);
}
exports.generateToken = function (params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 28800 });
}
