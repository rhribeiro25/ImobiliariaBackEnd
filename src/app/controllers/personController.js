const express = require('express');
const authMiddleware = require("../middlewares/auth");
const Person = require('../models/person');
const PersonService = require("../services/personService")
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try {
        let {status, person} = await PersonService.create(req.body);
        res.status(status).send({ person });
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to create a new person!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const people = await Person.find().populate(["crBy"]);
        if(!people)
            return res.status(400).send({ error: "People not found!" });
        return res.status(200).send(people);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to list people!"
            }
        });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id).populate(["crBy"]);
        if(!person)
            return res.status(400).send({ error: "Person not found!" });
        res.status(200).send(person);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to show person!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndRemove(req.params.id);
        if(!person)
            return res.status(400).send({ error: "Person not found!" });
        res.status(200).send("Successful person deleted!");
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to delete person!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!person)
            return res.status(400).send({ error: "Person not found!" });
        res.status(200).send(person);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to update person!"
            }
        });
    }
});

module.exports = app => app.use('/person', router);