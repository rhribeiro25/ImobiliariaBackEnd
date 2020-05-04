import PropertyService from '@services/PropertyService';
import app from 'app/app';
import { routerAuth } from '@configs/router/routes';
const propertyService = PropertyService.getInstance();

routerAuth.post('/create', async (req, res) => {
    try {
      const newProperty = req.body;
        const property = await propertyService.create(newProperty, req.userId);
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

routerAuth.get('/list', async (req, res) => {
    try {
        const properties = await propertyService.findAllPopulateRelations(["crBy", "contract"]);
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

routerAuth.get('/show/:id', async (req, res) => {
    try {
        const property = await propertyService.findByIdPopulateRelations(req.params.id, ["crBy", "contract"]);
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

routerAuth.delete('/delete/:id', async (req, res) => {
    try {
        const property = await propertyService.findByIdAndRemove(req.params.id);
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

routerAuth.patch('/update/:id', async (req, res) => {
    try {
        const property = req.body;
        const updatedProperty = await propertyService.findByIdAndUpdate(req.params.id, property, { new: true, runValidators: true });
        if (!updatedProperty)
            return res.status(400).send({ error: { message: "Imóvel não encontrado!" } });
        res.status(200).send(updatedProperty);
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

export default app.use('/property', routerAuth);