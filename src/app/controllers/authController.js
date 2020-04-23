const express = require('express');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const User = require('../models/person');
const router = express.Router();
const hbs = require("nodemailer-express-handlebars");
const { mailOptions, hbsOptions }= require("../../config/mail_forgot_password.json");

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
}

router.post('/create_user', async (req, res) => {
    const { email } = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(404).send({ error: "User already exists!" });
        const user = await User.create(req.body);
        user.password = undefined;
        return res.status(201).send({ user, token: generateToken({ id: user.id }) });
    } catch(err){
        return res.status(500).send({ error: "Failed to create user!" });
    }
});

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if(!user)
        return res.status(404).send({ error: "User not found!" });

    if(!await bcrypt.compare(password, user.password))
        return res.status(404).send({ error: "Invalid password!" });

    user.password = undefined;
    res.status(200 ).send({ user, token: generateToken({ id: user.id }) });
});

router.post("/forgot_password", async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user)
        return res.status(404).send({ error: "User not found!" });
        
        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);
        
        await User.findByIdAndUpdate(user.id, {
            "$set": {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        mailOptions.to = email;
        mailOptions.context.token = token;
        mailer.use("compile", hbs(hbsOptions));
        await mailer.sendMail(mailOptions, (err) => {
            if(err)
                return res.status(500).send({ error: "Can not send forgot password email!" });
            return res.status(200).send("Successful E-mail send!" );
        });
    } catch(err) {
        return res.status(500).send({ error: "Erro on forgot password, try again!" });
    }
});

router.post("/reset_password", async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
        .select("+passwordResetToken passwordResetExpires");
        const now = new Date();

        if(!user)
            return res.status(404).send({ error: "User not found!" });

        if(token !== user.passwordResetToken)
            return res.status(404).send({ error: "Token Invalid!" });

        if(now > user.passwordResetExpires)
            return res.status(404).send({ error: "Token expired, generate a new one!" });

        user.password = password;

        await user.save();

        res.status(200).send("Successful password reset!")

    } catch (error) {
        res.status(500).send({ error: "Can not reset password, try again!" });
    }
})

module.exports = app => app.use('/auth', router);