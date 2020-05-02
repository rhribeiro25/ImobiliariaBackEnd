const UserService = require('../services/userService');
const UserServiceImpl = new UserService();
const authSecurity = require("../../security/auth");
const express = require('express');
const router = express.Router();
const routerAuth = express.Router();
routerAuth.use(authSecurity);

router.post('/create', async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const email = req.body.email;
        const userExists = await UserServiceImpl.findByMail(email);
        if (userExists)
            return res.status(400).send({ error: { message: "Email já cadastrado no sistema!" } });
        const user = await UserServiceImpl.create(req);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao criar novo usuário!"
            }
        });
    }
});

routerAuth.get('/list', async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const users = await UserServiceImpl.findAll();
        if (!users)
            return res.status(404).send({ error: { message: "Usuários não encontrados!" } });
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao listar usuários!"
            }
        });
    }
});

routerAuth.get('/show/:id', async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const user = await UserServiceImpl.findById(req.params.id);
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao localizar usuário!"
            }
        });
    }
});

routerAuth.delete('/delete/:id', async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const user = await UserServiceImpl.findByIdAndRemove(req.params.id);
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        res.status(200).send("Sucesso ao deletar usuário!");
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao deletar usuário!"
            }
        });
    }
});

routerAuth.patch('/update/:id', async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const user = await UserServiceImpl.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha na atualização de usuário!"
            }
        });
    }
});

router.post("/authenticate", async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const { email, pass } = req.body;
        const user = await UserServiceImpl.findByMail(email, "+pass");
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        const isAuthenticated = await UserServiceImpl.isAuthenticated(pass, user.pass);
        if (!isAuthenticated)
            return res.status(404).send({ error: { message: "Senha Inválida!" } });
        user.pass = undefined;
        res.status(200).send({ user, token: UserServiceImpl.generateToken({ id: user.id }) });
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha na autenticação de usuário!"
            }
        });
    }
});

router.post("/forgot_password", async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const { email } = req.body;
        let user = await UserServiceImpl.findByMail(email);
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        const token = await UserServiceImpl.updateTokenExpires(user.id);
        await UserServiceImpl.sendMailRecoveryPassword({ email, token });
        return res.status(200).send("Sucesso ao enviar email!");
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao enviar email de recuperação de senha, tente novamente!"
            }
        });
    }
});

router.patch("/reset_password", async (req, res) => {
    try {
        UserServiceImpl.setRepository();
        const { email, token, pass } = req.body;
        let user = await UserServiceImpl.findByMail(email, "+resetToken resetExpires")
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        if (token !== user.resetToken)
            return res.status(404).send({ error: { message: "Token inválido, favor tentar novamente!" } });
        if (new Date() > user.resetExpires)
            return res.status(404).send({ error: { message: "Token expirado, favor gerar token novamente!" } });
        await UserServiceImpl.updatePassword(user.id, pass);
        res.status(200).send("Sucesso ao resetar senha!")
    } catch (error) {
        return res.status(500).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao resetar senha, tente novamente!"
            }
        });
    }
})

module.exports = app => app.use('/user', [router, routerAuth]);