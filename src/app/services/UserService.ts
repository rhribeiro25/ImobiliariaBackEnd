import crypto from "crypto";
import bcrypt from "bcryptjs";
import authConfig from "@configs/authentication/auth.ts";

import mailer from "@configs/mail/mailer";
import jwt from "jsonwebtoken";
import mailFPConfig from "@configs/mail/mailForgotPassword.ts";

import GenericService from '@services/GenericService';
import UserRepository from '@repositories/UserRepository';
import UserModel from "@models/UserModel";
import { UserInterface } from "@interfaces/UserInterface";
import hbs from "nodemailer-express-handlebars";

class UserService extends GenericService {
  
  private static instance: UserService;

  constructor() {
    super(new UserRepository(UserModel));
  }

  public async create(newUser: UserInterface) {
    newUser.pass = await this.encryptPassword(newUser.pass);
    let user = await (<UserRepository>super.genericRepository).create(newUser);
    (<UserInterface>user).pass = "";
    return user;
  }

  public async findByMail(email: string, selectAttributes: string) {
    return await (<UserRepository>super.genericRepository).findByMail(email, selectAttributes);
  }

  public async findByIdAndUpdate(id: string, newUser: UserInterface, actionsJson: {}) {
    return await super.genericRepository.findByIdAndUpdate(id, newUser, actionsJson);

  }

  public async sendMailRecoveryPassword(email: string, token: string) {
    mailFPConfig.mailOptions.to = email;
    mailFPConfig.mailOptions.context.token = token;
    mailer.use("compile", hbs(mailFPConfig.hbsOptions));
    await mailer.sendMail(mailFPConfig.mailOptions);
  }

  public async updateTokenExpires(id: string, actionsJson: {}) {
    const token: string = crypto.randomBytes(20).toString("hex");
    const expiresIn: Date = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    let updatedUser = UserModel.constructor(token, expiresIn);
    await super.genericRepository.findByIdAndUpdate(id, updatedUser, actionsJson);
    return token;
  }

  public async updatePassword(id: string, pass: string, actionsJson: {}) {
    const passEncrypt = await this.encryptPassword(pass);
    let updatedUser = UserModel.constructor(passEncrypt);
    await super.genericRepository.findByIdAndUpdate(id, updatedUser, actionsJson);
  }

  public async isAuthenticated(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }

  public async encryptPassword(pass: string) {
    var salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);
  }

  public generateToken = function (params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 28800 });
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}

export default UserService;