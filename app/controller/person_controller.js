var express = require('express');
var router = express.Router();
var Person = require('../model/person');

router.post('/', (req, res) => {
    console.log(req.body);
    let p = new personalbar({name: req.body.name});
    p.save((err, person) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(person);
    })
})

router.get('/', (req, res) => {
    Person.find().exec((err, person) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(person);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Person.deleteOne({_id: id}, (err) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    })
})

router.patch('/:id', (req, res) => {
    Person.findById(req.params.id, (err, p) => {
        if(err)
            res.status(500).send(err);
        else if(!p)
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
})

module.exports = router;