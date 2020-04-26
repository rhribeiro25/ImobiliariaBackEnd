const express = require('express');
const authMiddleware = require("../../middlewares/auth")
const Person = require('../models/personModel');
const Contract = require('../models/contractModel');
const Property = require('../models/propertyModel');
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try{
        const { startDate, finishDate, people, property } = req.body;
        const contract = await Contract.create({ startDate, finishDate, user: req.userId });
        await Promise.all(people.map(async person => {
            const personContract = new Person({ ...person, contract: contract.id });
            await personContract.save();
            contract.people.push(personContract);
        }));
        const propertyContract = new Property({ ...property, contract: contract.id });
        await propertyContract.save();
        contract.property = propertyContract;
        await contract.save();
        return res.status(201).send({ contract });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to create a new contract!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const contracts = await Contract.find().populate(["user", "people", "property"]);
        if(!contracts)
            return res.status(404).send({ error: "Contracts not found!" });
        return res.status(200).send(contracts);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to list contracts!"
            }
        });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id).populate(["user", "people", "property"]);
        if(!contract)
            return res.status(404).send({ error: "Contract not found!" });
        res.status(200).send(contract);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to show contract!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const contract = await Contract.findByIdAndRemove(req.params.id);
        if(!contract)
            return res.status(404).send({ error: "Contract not found!" });
        res.status(200).send("Successful contract deleted!");
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to delete people!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        req.body.updatedAt = Date.now();
        const { startDate, finishDate, people, property } = req.body;
        let contract = await Contract.findByIdAndUpdate(req.params.id, {
            startDate, 
            finishDate, 
            user: req.userId 
        }, { new: true, runValidators: true });
        if (!contract)
            return res.status(404).send({ error: "Contract not found!" });
        contract.people = [];
        await Person.remove({ contract: contract._id});
        await Promise.all(people.map(async person => {
            const personContract = new Person({ ...person, contract: contract.id });
            personContract.updatedAt = Date.now();
            await personContract.save();
            contract.people.push(personContract);
        }));
        await Property.remove({ contract: contract._id});
        const propertyContract = new Property({ ...property, contract: contract.id });
        propertyContract.updatedAt = Date.now();
        await propertyContract.save();
        contract.property = propertyContract;
        await contract.save();
        return res.status(200).send({ contract });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to update contract!"
            }
        });
    }
});

module.exports = app => app.use('/contract', router);