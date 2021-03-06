const PersonService = require("../services/personService");
const PersonServiceImpl = new PersonService();
const authSecurity = require("../../security/auth");
const express = require('express');
const routerAuth = express.Router();
routerAuth.use(authSecurity);

routerAuth.post('/create', async (req, res) => {
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

routerAuth.get('/list', async (req, res) => {
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

routerAuth.get('/show/:id', async (req, res) => {
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

routerAuth.delete('/delete/:id', async (req, res) => {
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

routerAuth.patch('/update/:id', async (req, res) => {
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

module.exports = app => app.use('/person', routerAuth);