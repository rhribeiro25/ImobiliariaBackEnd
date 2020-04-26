const express = require('express');
const authMiddleware = require("../../middlewares/auth");
const PersonService = require("../services/personService")
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try {
        let {status, person} = await PersonService.create(req);
        res.status(status).send({ person });
    } catch (error) {
        return res.status(400).send({ 
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao criar pessoas!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const people = await PersonService.findAllPopulateRelations("crBy");
        if(!people)
            return res.status(400).send({ error: { message: "Pessoas não encontradas!"} });
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

router.get('/show/:id', async (req, res) => {
    try {
        const person = await PersonService.findByIdPopulateRelations(req.params.id, "crBy");
        if(!person)
            return res.status(400).send({ error: { message: "Pessoa não encontrada!"} });
        res.status(200).send(person);
    } catch (error) {
        return res.status(400).send({ 
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao buscar pessoa!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const person = await PersonService.findByIdAndRemove(req.params.id);
        if(!person)
            return res.status(400).send({ error: { message: "Pessoa não encontrada!" } });
        res.status(200).send({ error: { message: "Sucesso ao deletar pessoa!" } });
    } catch (error) {
        return res.status(400).send({ 
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao Deletar pessoa!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        let {status, person, msg} = await PersonService.findByDocAndUpdate(req, { new: true, runValidators: true });
        if(person)
            res.status(status).send({ person });
        else
            res.status(status).send({ error: { message: "Impossível alterar os documentos CPF ou CNPJ!" } })
    } catch (error) {
        return res.status(400).send({ 
            error: {
                name: error.name,
                description: error.message,
                message: "Falha ao atualizar pessoa!"
            }
        });
    }
});

module.exports = app => app.use('/person', router);