const express = require('express');
const PropertyService = require('../services/propertyService');
const authSecurity = require("../../security/auth");
const routerAuth = express.Router();
routerAuth.use(authSecurity);

routerAuth.post('/create', async (req, res) => {
    try {
        const property = await PropertyService.create(req);
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
        const properties = await PropertyService.findAllPopulateRelations(["crBy", "contract"]);
        if (!properties)
            return res.status(400).send({ error: "Imóvel não encontrado!" });
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
        const property = await PropertyService.findByIdPopulateRelations(req.params.id, ["crBy", "contract"]);
        if (!property)
            return res.status(400).send({ error: "Imóvel não encontrado!" });
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
        const property = await PropertyService.findByIdAndRemove(req.params.id);
        if (!property)
            return res.status(400).send({ error: "Imóvel não encontrado!" });
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
        const property = await PropertyService.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (!property)
            return res.status(400).send({ error: "Imóvel não encontrado!" });
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

module.exports = app => app.use('/property', routerAuth);