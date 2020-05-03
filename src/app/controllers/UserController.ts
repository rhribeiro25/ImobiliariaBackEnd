import UserService from '../services/userService'

class UserController {

    public async create (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const email = req.body.email;
            const userExists = await UserService.findByMail(email);
            if (userExists)
                return res.status(400).send({ error: { message: "Email já cadastrado no sistema!" } });
            const user = await UserService.create(req);
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
    
    public async list (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const users = await UserService.findAll();
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
    
    public async show (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const user = await UserService.findById(req.params.id);
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
    
    public async delete (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const user = await UserService.findByIdAndRemove(req.params.id);
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
    
    public async update (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const user = await UserService.findByIdAndUpdate(req, { new: true, runValidators: true });
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
    
    public async authenticate (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const { email, pass } = req.body;
            const user = await UserService.findByMail(email, "+pass");
            if (!user)
                return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
            const isAuthenticated = await UserService.isAuthenticated(pass, user.pass);
            if (!isAuthenticated)
                return res.status(404).send({ error: { message: "Senha Inválida!" } });
            user.pass = undefined;
            res.status(200).send({ user, token: UserService.generateToken({ id: user.id }) });
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
    
    public async forgotPassword (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const { email } = req.body;
            let user = await UserService.findByMail(email);
            if (!user)
                return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
            const token = await UserService.updateTokenExpires(user.id);
            await UserService.sendMailRecoveryPassword({ email, token });
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
    
    public async resetPassword (req: Request, res: Response): Promise<Response> {
        try {
            UserService.setRepository();
            const { email, token, pass } = req.body;
            let user = await UserService.findByMail(email, "+resetToken resetExpires")
            if (!user)
                return res.status(404).send({ error: { message: "Usuário não encontrado!" } });
            if (token !== user.resetToken)
                return res.status(404).send({ error: { message: "Token inválido, favor tentar novamente!" } });
            if (new Date() > user.resetExpires)
                return res.status(404).send({ error: { message: "Token expirado, favor gerar token novamente!" } });
            await UserService.updatePassword(user.id, pass);
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
}


export default new  UserController()