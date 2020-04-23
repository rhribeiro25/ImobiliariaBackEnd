const express = require('express');
const authMiddleware = require("../middlewares/auth")
const Person = require('../models/person');
const Contract = require('../models/contract');
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try{
        if(await Person.findOne({ email: req.body.email }))
            return res.status(404).send({ error: "Person already exists!" });
        const person = await Person.create( {...req.body, user: req.userId });
        person.password = undefined;
        return res.status(201).send({ person });
    } catch(error){
        return res.status(500).send({ error: "Failed to create person!" });
    }
});

router.get('/list', async (req, res) => {
    try {
        await Person.find().populate(["user", "contract"]).exec((err, people) => {
            if (err)
                return res.status(500).send({ error: "Failed to find people!" });
            else if(!people)
                return res.status(404).send({ error: "People not found!" });
            else
                return res.status(200).send(people);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to list people!" });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        await Person.findById(req.params.id).populate(["user", "contract"]).exec((err, person) => {
            if (err)
                return res.status(500).send({ error: "Failed to find person!" });
            else if(!person)
                return res.status(404).send({ error: "Person not found!" });
            else
                res.status(200).send(person);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to show person!" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Person.findByIdAndRemove(req.params.id, (err, person) => {
            if (err)
                res.status(500).send({error: "Failed to delete person!"});
            else if(!person)
                return res.status(404).send({ error: "Person not found!" });
            else
                res.status(200).send("Successful person deleted!");
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to delete people!" });
    }
});

router.put('/update/:id', async (req, res) => {
    Person.findById(req.params.id, (err, p) => {
        if (err)
            return res.status(404).send({ error: "Person not found!" });
        else if (!p)
            return res.status(404).send({ error: "Person not found!" });
        else {
            let pc = new Person(req.body);
            if (pc.id === p.id) {
                pc.save()
                    .then((pc) => res.status(200).send(pc))
                    .catch((e) => res.status(500).send(e));
            }
        }
    })
});

module.exports = app => app.use('/people', router);