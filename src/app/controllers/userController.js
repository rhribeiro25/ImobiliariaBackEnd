const express = require('express');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const User = require('../models/userModel');
const router = express.Router();
const hbs = require("nodemailer-express-handlebars");
const { mailOptions, hbsOptions } = require("../../config/mail_forgot_password.json");

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
}

router.post('/create', async (req, res) => {
    try{
        const { email } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists)
            return res.status(400).send({ error: "User already exists!" });
        const user = await User.create(req.body);
        user.pass = undefined;
        return res.status(201).send({ user, token: generateToken({ id: user.id }) });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to create a new user!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        if(!users)
            return res.status(404).send({ error: "Users not found!" });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to list users!"
            }
        });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).send({ error: "User not found!" });
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to show user!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user)
            return res.status(404).send({ error: "User not found!" });
        res.status(200).send("Successful user deleted!");
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to delete user!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user)
            return res.status(404).send({ error: "User not found!" });
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to update user!"
            }
        });
    }
});

router.post("/authenticate", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await User.findOne({ email }).select("+pass");
        if(!user)
            return res.status(404).send({ error: "User not found!" });
        if(!await bcrypt.compare(pass, user.pass))
            return res.status(404).send({ error: "Invalid password!" });
        user.pass = undefined;
        res.status(200 ).send({ user, token: generateToken({ id: user.id }) });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to authenticate user!"
            }
        });
    }
});

router.post("/forgot_password", async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user)
            return res.status(404).send({ error: "User not found!" });
        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await User.findByIdAndUpdate(user.id, {
            "$set": {
                resetToken: token,
                resetExpires: now
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
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to forgot password, try again!"
            }
        });
    }
});

router.post("/reset_password", async (req, res) => {
    try {
        const { email, token, pass } = req.body;
        const user = await User.findOne({ email })
        .select("+resetToken resetExpires")
        const now = new Date();
        if(!user)
            return res.status(404).send({ error: "User not found!" });
        if(token !== user.resetToken)
            return res.status(404).send({ error: "Token Invalid!" });
        if(now > user.resetExpires)
            return res.status(404).send({ error: "Token expired, generate a new one!" });
        user.pass = pass;
        await user.save();
        res.status(200).send("Successful password reset!")
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to reset password, try again!"
            }
        });
    }
})

module.exports = app => app.use('/user', router);