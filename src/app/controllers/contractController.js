const express = require('express');
const authMiddleware = require("../middlewares/auth")
const Person = require('../models/person');
const Contract = require('../models/contract');
const Property = require('../models/property');
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
        return res.status(500).send({ error: "Failed to create contract!" });
    }
});

router.get('/list', async (req, res) => {
    try {
        await Contract.find().populate(["user", "people", "property"]).exec((err, contracts) => {
            if (err)
                return res.status(500).send({ error: "Failed to find contracts!" });
            else if(!contracts)
                return res.status(404).send({ error: "People not found!" });
            else
                return res.status(200).send(contracts);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to list contracts!" });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        await Contract.findById(req.params.id).populate(["user", "people", "property"]).exec((err, contract) => {
            if (err)
                return res.status(500).send({ error: "Failed to find contract!" });
            else if(!contract)
                return res.status(404).send({ error: "Contract not found!" });
            else
                res.status(200).send(contract);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to show contract!" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Contract.findByIdAndRemove(req.params.id, (err, contract) => {
            if (err)
                res.status(500).send({error: "Failed to delete contract!"});
            else if(!contract)
                return res.status(404).send({ error: "Contract not found!" });
            else
                res.status(200).send("Successful contract deleted!");
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to delete people!" });
    }
});

router.put('/update/:id', async (req, res) => {
    Contract.findById(req.params.id, (err, contract) => {
        if (err)
            return res.status(404).send({ error: "Contract not found!" });
        else if (!contract)
            return res.status(404).send({ error: "Contract not found!" });
        else {
            let cont = new Contract(req.body);
            if (cont.id === contract.id) {
                cont.save()
                    .then((cont) => res.status(200).send(cont))
                    .catch((e) => res.status(500).send(e));
            }
        }
    })
});

module.exports = app => app.use('/contracts', router);