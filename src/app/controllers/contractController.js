const express = require('express');
const ContractService = require('../services/contractService');
const authSecurity = require("../../security/auth");
const router = express.Router();
router.use(authSecurity);

router.post('/create', async (req, res) => {
    try{
        // const { startDate, finishDate, people, property } = req.body;
        // const contract = await ContractService.create({ startDate, finishDate, user: req.userId });
        // await Promise.all(people.map(async person => {
        //     const personContract = new PersonService({ ...person, contract: contract.id });
        //     await personContract.save();
        //     contract.people.push(personContract);
        // }));
        // const propertyContract = new PropertyService({ ...property, contract: contract.id });
        // await propertyContract.save();
        // contract.property = propertyContract;
        // await contract.save();
        const contract = ContractService.create(req);
        return res.status(201).send({ contract });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Falha ao criar novo contrato!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const contracts = await ContractService.find().populate(["user", "people", "property"]);
        if(!contracts)
            return res.status(400).send({ error: "Contracts not found!" });
        return res.status(200).send(contracts);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Falha ao listar contrato!"
            }
        });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const contract = await ContractService.findById(req.params.id).populate(["user", "people", "property"]);
        if(!contract)
            return res.status(400).send({ error: "Contract not found!" });
        res.status(200).send(contract);
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Falha ao localizar contrato!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const contract = await ContractService.findByIdAndRemove(req.params.id);
        if(!contract)
            return res.status(400).send({ error: "Contract not found!" });
        res.status(200).send("Successful contract deleted!");
    } catch (err) {
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Falha ao deletar contrato!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    // try{
    //     req.body.updatedAt = Date.now();
    //     const { startDate, finishDate, people, property } = req.body;
    //     let contract = await ContractService.findByIdAndUpdate(req.params.id, {
    //         startDate, 
    //         finishDate, 
    //         user: req.userId 
    //     }, { new: true, runValidators: true });
    //     if (!contract)
    //         return res.status(400).send({ error: "Contract not found!" });
    //     contract.people = [];
    //     await PersonService.remove({ contract: contract._id});
    //     await Promise.all(people.map(async person => {
    //         const personContract = new PersonService({ ...person, contract: contract.id });
    //         personContract.updatedAt = Date.now();
    //         await personContract.save();
    //         contract.people.push(personContract);
    //     }));
    //     await PropertyService.remove({ contract: contract._id});
    //     const propertyContract = new PropertyService({ ...property, contract: contract.id });
    //     propertyContract.updatedAt = Date.now();
    //     await propertyContract.save();
    //     contract.property = propertyContract;
    //     await contract.save();
    //     return res.status(200).send({ contract });
    // } catch(err){
    //     return res.status(500).send({ 
    //         error: {
    //             name: err.name,
    //             description: err.message,
    //             message: "Failed to update contract!"
    //         }
    //     });
    // }

    try {
        let { status, contract } = await ContractService.findByIdAndUpdate(req, { new: true, runValidators: true });
        if (contract)
            res.status(status).send({ contract });
        else
            res.status(status).send({ error: { message: "Contrato não encontrada!" } })
    } catch (error) {
        return res.status(400).send({
            error: {
                name: error.name,
                description: error.message,
                message: "Falha na atualização de contrato!"
            }
        });
    }
});

module.exports = app => app.use('/contract', router);