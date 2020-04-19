const express = require('express');
const bcrypt = require("bcrypt");
const Person = require('../models/person');
const router = express.Router();


router.post('/create', async (req, res) => {

    console.log(req.body);
    try{
        const person = await Person.create(req.body);
        return res.send(person);
    } catch(err){
        return res.status(400);
    }



    // const p = new Person(req.body);
    // console.log(person);
    // p.save((err, person) => {
    //     if (err)
    //         res.status(500).send(err);
    //     else
    //         res.status(200).send(person);
    // })
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

// router.post("/authenticate", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await Person.findOne({ email }).select("+password");
//     if(!user)
//         return res.status(400).send({ error: "User not found" });

//     if(!await bcrypt.compare(password, user.password))
//         return res.status(400).send({ error: "Invalid password" });

//     user.password = undefined;

//     res.send({ user });
// });

module.exports = app => app.use('/people', router);