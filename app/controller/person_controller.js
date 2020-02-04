var express = require('express');
var router = express.Router();
var Person = require('./person');

router.post('/', function(req, res){
    console.log(req.body);
    let p = new personalbar({name: req.body.name});
    p.save((err, person) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(person);
    })
})

router.get('/', function(req, res){
    Person.find().exec((err, person) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(person);
    })
})