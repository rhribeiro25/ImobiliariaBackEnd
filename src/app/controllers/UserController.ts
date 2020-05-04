import UserService from '@services/UserService';
import { UserInterface } from '@interfaces/UserInterface';
import app from '../app';
import { routerUnsafe, routerAuth } from '@configs/router/routes';
const userService = UserService.getInstance();

routerUnsafe.post('/create', async (req, res) => {
    try {
      const newUser = req.body;
        const email = req.body.email;
        const userExists = await userService.findByMail(email, "");
        if (userExists)
            return res.status(400).send({ error: { message: "Email já cadastrado no sistema!" } });
        const user = await userService.create(newUser);
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
        const users = await userService.findAll();
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
        const user = await userService.findById(req.params.id);
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
        const user = await userService.findByIdAndRemove(req.params.id);
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
        const user = req.body;
        const updated = await userService.findByIdAndUpdate(req.params.id, user, { new: true, runValidators: true });
        if (!updated)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        res.status(200).send(updated);
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

routerUnsafe.post("/authenticate", async (req, res) => {
    try {
        const { email, pass } = req.body;
        let user: UserInterface = await userService.findByMail(email, "+pass");
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        const isAuthenticated = await userService.isAuthenticated(pass, user.pass);
        if (!isAuthenticated)
            return res.status(404).send({ error: { message: "Senha Inválida!" } });
        user.pass = "";
        res.status(200).send({ user, token: userService.generateToken({ id: user.id }) });
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

routerUnsafe.post("/forgot_password", async (req, res) => {
    try {
        const { email } = req.body;
        let user = await userService.findByMail(email, "");
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        const token = await userService.updateTokenExpires(user.id, {});
        await userService.sendMailRecoveryPassword(email, token);
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

routerUnsafe.patch("/reset_password", async (req, res) => {
    try {
        const { email, token, pass } = req.body;
        let user: UserInterface = await userService.findByMail(email, "+resetToken resetExpires")
        if (!user)
            return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
        if (token !== user.resetToken)
            return res.status(404).send({ error: { message: "Token inválido, favor tentar novamente!" } });
        if (user.resetExpires && new Date() > user.resetExpires)
            return res.status(404).send({ error: { message: "Token expirado, favor gerar token novamente!" } });
        await userService.updatePassword(user.id, pass, {});
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

export default app.use('/user', [routerUnsafe, routerAuth]);