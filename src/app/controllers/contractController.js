const express = require('express');
const ContractService = require('../services/contractService');
const authSecurity = require("../../security/auth");
const routerAuth = express.Router();
routerAuth.use(authSecurity);

routerAuth.post('/create', async (req, res) => {
    try {
        const contract = await ContractService.create(req);
        return res.status(201).send({ contract });
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao criar novo contrato!"
            }
        });
    }
});

routerAuth.get('/list', async (req, res) => {
    try {
        const contracts = await ContractService.findAllPopulateRelations(["crBy", "people", "property"]);
        if (!contracts)
            return res.status(400).send({ error: { message: "Contracts not found!" } });
        return res.status(200).send(contracts);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao listar contrato!"
            }
        });
    }
});

routerAuth.get('/show/:id', async (req, res) => {
    try {
        const contract = await ContractService.findByIdPopulateRelations(req.params.id, ["crBy", "people", "property"]);
        if (!contract)
            return res.status(400).send({ error: { message: "Contract not found!" } });
        res.status(200).send(contract);
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao localizar contrato!"
            }
        });
    }
});

routerAuth.delete('/delete/:id', async (req, res) => {
    try {
        const contract = await ContractService.findByIdAndRemove(req.params.id);
        if (!contract)
            return res.status(400).send({ error: { message: "Contract not found!" } });
        res.status(200).send("Successful contract deleted!");
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao deletar contrato!"
            }
        });
    }
});

routerAuth.patch('/update/:id', async (req, res) => {
    try {
        let { status, contract } = await ContractService.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (contract)
            res.status(status).send({ contract });
        else
            res.status(status).send({ error: { message: "Contrato não encontrada!" } })
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha na atualização de contrato!"
            }
        });
    }
});

module.exports = app => app.use('/contract', routerAuth);