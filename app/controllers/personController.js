const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth")
const authMiddleware = require("../middlewares/auth")
const Person = require('../models/person');
const router = express.Router();
router.use(authMiddleware);

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
}

router.post('/create', async (req, res) => {
    try{
        if(await Person.findOne({ email: req.body.email }))
            return res.status(404).send({ error: "Person already exists!" });
        const person = await Person.create(req.body);
        person.password = undefined;
        return res.status(201).send({ person, token: generateToken({ id: person.id }) });
    } catch(err){
        return res.status(500).send({ error: "Person creation failed!" });
    }
});

router.get('/', async (req, res) => {
    Person.find().exec((err, people) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(people);
    })
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    Person.deleteOne({ _id: id }, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    })
});

router.patch('/:id', async (req, res) => {
    Person.findById(req.params.id, (err, p) => {
        if (err)
            res.status(500).send(err);
        else if (!p)
            res.status(404).send({});
        else {
            //p.type = req.body.type;
            p.firstName = req.body.firstName;
            p.lastName = req.body.lastName;
            p.birthday = req.body.birthday;
            p.motherName = req.body.motherName;
            p.fatherName = req.body.fatherName;
            //p.documents = req.body.documents;
            //p.addresses = req.body.addresses;
            //p.phoneNumbers = req.body.phoneNumbers;
            p.save()
                .then((p) => res.status(200).send(p))
                .catch((e) => res.status(500).send(e));
        }
    })
});

router.put('/:id', async (req, res) => {
    Person.findById(req.params.id, (err, p) => {
        if (err)
            res.status(500).send(err);
        else if (!p)
            res.status(404).send({});
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

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;
    const person = await Person.findOne({ email }).select("+password");

    if(!person)
        return res.status(404).send({ error: "User not found!" });

    if(!await bcrypt.compare(password, person.password))
        return res.status(404).send({ error: "Invalid password!" });

    person.password = undefined;
    res.status(200 ).send({ person, token: generateToken({ id: person.id }) });
});

module.exports = app => app.use('/people', router);