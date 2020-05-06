import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import mailer from '@configs/mail/mailer';
import jwt from 'jsonwebtoken';
import { mailOptions, hbsOptions } from '@configs/mail/mailOptionForgotPassword';

import GenericService from '@services/GenericService';
import UserRepository from '@repositories/UserRepository';
import UserModel from '@models/UserModel';
import { UserInterface } from '@interfaces/UserInterface';
import hbs from 'nodemailer-express-handlebars';

class UserService extends GenericService {
  private static instance: UserService;
  private userRepository = UserRepository.getInstance();

  constructor() {
    super(UserRepository.getInstance());
  }

  public async create(newUser: UserInterface) {
    newUser.pass = await this.encryptPassword(newUser.pass);
    let user: UserInterface = await this.userRepository.create(newUser);
    user.pass = '';
    return user;
  }

  public async findByMail(email: string, selectAttributes: string) {
    return await this.userRepository.findByMail(email, selectAttributes);
  }

  public async findByIdAndUpdate(id: string, newUser: UserInterface, actionsJson: {}) {
    return await this.userRepository.findByIdAndUpdate(id, newUser, actionsJson);
  }

  public async sendMailRecoveryPassword(email: string, token: string) {
    mailOptions.to = email;
    mailOptions.context.token = token;
    mailer.use('compile', hbs(hbsOptions));
    await mailer.sendMail(mailOptions);
  }

  public async updateTokenExpires(id: string, actionsJson: {}) {
    const token: string = crypto.randomBytes(20).toString('hex');
    const expiresIn: Date = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    let updatedUser = UserModel.set(token, expiresIn);
    await this.userRepository.findByIdAndUpdate(id, updatedUser, actionsJson);
    return token;
  }

  public async updatePassword(id: string, pass: string, actionsJson: {}) {
    const passEncrypt = await this.encryptPassword(pass);
    let updatedUser = UserModel.set(passEncrypt);
    await this.userRepository.findByIdAndUpdate(id, updatedUser, actionsJson);
  }

  public async isAuthenticated(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }

  public async encryptPassword(pass: string) {
    var salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);
  }

  public generateToken = function (secret: string, params = {}) {
    return jwt.sign(params, secret, { expiresIn: 28800 });
  };

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}

export default UserService;
