import UserService from '../services/propertyService'

class PropertyController {

public async create (req: Request, res: Response): Promise<Response> {
    try {
        PropertyServiceImpl.setRepository();
        const property = await PropertyServiceImpl.create(req);
        return res.status(201).send({ property });
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao criar novo Imóvel!"
            }
        });
    }
});

public async list (req: Request, res: Response): Promise<Response> {
    try {
        PropertyServiceImpl.setRepository();
        const properties = await PropertyServiceImpl.findAllPopulateRelations(["crBy", "contract"]);
        if (!properties)
            return res.status(400).send({ error: { message: "Imóvel não encontrado!" } });
        return res.status(200).send(properties);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao listar Imóvel!"
            }
        });
    }
});

public async show (req: Request, res: Response): Promise<Response> {
    try {
        PropertyServiceImpl.setRepository();
        const property = await PropertyServiceImpl.findByIdPopulateRelations(req.params.id, ["crBy", "contract"]);
        if (!property)
            return res.status(400).send({ error: { message: "Imóvel não encontrado!" } });
        res.status(200).send(property);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao localizar Imóvel!"
            }
        });
    }
});

public async delete (req: Request, res: Response): Promise<Response> {
    try {
        PropertyServiceImpl.setRepository();
        const property = await PropertyServiceImpl.findByIdAndRemove(req.params.id);
        if (!property)
            return res.status(400).send({ error: { message: "Imóvel não encontrado!" } });
        res.status(200).send("Sucesso ao deletar Imóvel!");
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao deletar Imóvel!"
            }
        });
    }
});

public async update (req: Request, res: Response): Promise<Response> {
    try {
        PropertyServiceImpl.setRepository();
        const property = await PropertyServiceImpl.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (!property)
            return res.status(400).send({ error: { message: "Imóvel não encontrado!" } });
        res.status(200).send(property);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao atualizar Imóvel!"
            }
        });
    }
});
}

export default new  PropertyController()