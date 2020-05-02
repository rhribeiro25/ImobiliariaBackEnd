const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const authConfig = require("../../config/auth");

const hbs = require("nodemailer-express-handlebars");
const mailer = require("../../modules/mailer");
const jwt = require("jsonwebtoken");
const { mailOptions, hbsOptions } = require("../../config/mailForgotPassword.json");

const MongooseSchema = require('../models/userModel');
const GenericService = require('./genericService');
const GenericServiceImpl = new GenericService();
const UserRepository = require('../repositories/userRepository');
const UserRepositoryImpl = new UserRepository();

class UserService extends GenericService {

    setRepository = function () {
        UserRepositoryImpl.setSchema(MongooseSchema);
        GenericServiceImpl.setRepository(UserRepositoryImpl);
    }

    create = async function (req) {
        let newUser = req.body;
        newUser.pass = await this.EncryptPassword(newUser.pass);
        let user = await UserRepositoryImpl.create(newUser);
        user.pass = undefined;
        return user;
    }

    findByMail = async function (email, selectAttributes) {
        return await UserRepositoryImpl.findByMail(email, selectAttributes);
    }

    findByIdAndUpdate = async function (req, actionsJson) {
        const { body } = req;
        let newUser = body;
        newUser.upAt = Date.now();
        return await UserRepositoryImpl.findByIdAndUpdate(req.params.id, { $set: newUser }, actionsJson);

    }

    sendMailRecoveryPassword = async function (params) {
        const { email, token } = params;
        mailOptions.to = email;
        mailOptions.context.token = token;
        mailer.use("compile", hbs(hbsOptions));
        await mailer.sendMail(mailOptions);
    }

    updateTokenExpires = async function (id) {
        const token = crypto.randomBytes(20).toString("hex");
        const expiresIn = new Date();
        expiresIn.setHours(expiresIn.getHours() + 1);
        await UserRepositoryImpl.findByIdAndUpdate(id, { "$set": { resetToken: token, resetExpires: expiresIn } });
        return token;
    }

    updatePassword = async function (id, pass) {
        const upAt = Date.now();
        pass = await this.EncryptPassword(pass);
        await UserRepositoryImpl.findByIdAndUpdate(id, { "$set": { pass, upAt } });
    }

    isAuthenticated = async function (pass, hash) {
        return await bcrypt.compare(pass, hash);
    }

    EncryptPassword = async function (pass) {
        var salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }
    generateToken = function (params = {}) {
        return jwt.sign(params, authConfig.secret, { expiresIn: 28800 });
    }
}

module.exports = UserService;