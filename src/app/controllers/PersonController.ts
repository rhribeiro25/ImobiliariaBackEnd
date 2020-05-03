import UserService from '../services/personService'

class PersonController {

public async create (req: Request, res: Response): Promise<Response> {
    try {
        PersonServiceImpl.setRepository();
        let { status, person } = await PersonServiceImpl.create(req);
        res.status(status).send({ person });
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao criar nova pessoa!"
            }
        });
    }
});

public async list (req: Request, res: Response): Promise<Response> {
    try {
        PersonServiceImpl.setRepository();
        const people = await PersonServiceImpl.findAllPopulateRelations(["crBy"]);
        if (!people)
            return res.status(400).send({ error: { message: "Pessoas não encontradas!" } });
        return res.status(200).send(people);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao listar pessoas!"
            }
        });
    }
});

public async show (req: Request, res: Response): Promise<Response> {
    try {
        PersonServiceImpl.setRepository();
        const person = await PersonServiceImpl.findByIdPopulateRelations(req.params.id, ["crBy"]);
        if (!person)
            return res.status(400).send({ error: { message: "Pessoa não encontrada!" } });
        res.status(200).send(person);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao localizar pessoa!"
            }
        });
    }
});

public async delete (req: Request, res: Response): Promise<Response> {
    try {
        PersonServiceImpl.setRepository();
        const person = await PersonServiceImpl.findByIdAndRemove(req.params.id);
        if (!person)
            return res.status(400).send({ error: { message: "Pessoa não encontrada!" } });
        res.status(200).send("Sucesso ao deletar pessoa!");
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao deletar pessoa!"
            }
        });
    }
});

public async update (req: Request, res: Response): Promise<Response> {
    try {
        PersonServiceImpl.setRepository();
        let { status, person } = await PersonServiceImpl.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (person)
            res.status(status).send({ person });
        else
            res.status(status).send({ error: { message: "Impossível alterar os documentos CPF ou CNPJ!" } });
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha na atualização de pessoa!"
            }
        });
    }
});
}

export default new  PersonController()