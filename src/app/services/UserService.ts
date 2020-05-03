import crypto from "crypto";
import bcrypt from "bcryptjs";
import authConfig from "@configs/authentication/auth.ts";

import hbs from "nodemailer-express-handlebars";
import mailer from "@configs/mail/mailer";
import jwt from "jsonwebtoken";
import mailFPConfig from "@configs/mail/mailForgotPassword.ts";

import UserModel, { UserInterface } from '@models/UserModel';
import GenericService from '@services/GenericService';
import UserRepository from '@repositories/UserRepository';

class UserService extends GenericService {

    constructor () {
        super(new UserRepository(UserModel));
    }

    create = async function (newUser: UserInterface) {
        newUser.pass = await this.encryptPassword(newUser.pass);
        let user = await super.geneticRepository.create(newUser);
        user.pass = undefined;
        return user;
    }

    findByMail = async function (email: string, selectAttributes: string) {
        return await super.geneticRepository.findByMail(email, selectAttributes);
    }

    findByIdAndUpdate = async function (id: string, newUser: UserInterface, actionsJson: JSON) {
        return await super.geneticRepository.findByIdAndUpdate(id, { $set: newUser }, actionsJson);

    }

    sendMailRecoveryPassword = async function (params) {
        const { email, token } = params;
        mailFPConfig.mailOptions.to = email;
        mailFPConfig.mailOptions.context.token = token;
        mailer.use("compile", hbs(mailFPConfig.hbsOptions));
        await mailer.sendMail(mailFPConfig.mailOptions);
    }

    updateTokenExpires = async function (id: string) {
        const token = crypto.randomBytes(20).toString("hex");
        const expiresIn = new Date();
        expiresIn.setHours(expiresIn.getHours() + 1);
        await super.geneticRepository.findByIdAndUpdate(id, { "$set": { resetToken: token, resetExpires: expiresIn } });
        return token;
    }

    updatePassword = async function (id: string, pass: string) {
        const upAt = Date.now();
        const passEncrypt = await this.encryptPassword(pass);
        await super.geneticRepository.findByIdAndUpdate(id, { "$set": { passEncrypt, upAt } });
    }

    isAuthenticated = async function (pass: string, hash: string) {
        return await bcrypt.compare(pass, hash);
    }

    encryptPassword = async function (pass: string) {
        var salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }
    generateToken = function (params = {}) {
        return jwt.sign(params, authConfig.secret, { expiresIn: 28800 });
    }
}

export default UserService;