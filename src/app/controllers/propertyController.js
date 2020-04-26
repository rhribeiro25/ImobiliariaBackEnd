const express = require('express');
const authMiddleware = require("../../middlewares/auth")
const Property = require('../models/propertyModel');
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try{
        const property = await Property.create({ ...req.body, user: req.userId });
        return res.status(201).send({ property });
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to create a new property!"
            }
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const properties = await Property.find().populate(["user", "contract"]);
        if(!properties)
            return res.status(404).send({ error: "Propert not found!" });
        return res.status(200).send(properties);
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to list property!"
            }
        });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(["user", "contract"]);
        if(!property)
            return res.status(404).send({ error: "Property not found!" });
        res.status(200).send(property);
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to show property!"
            }
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndRemove(req.params.id);
        if(!property)
            return res.status(404).send({ error: "Property not found!" });
        res.status(200).send("Successful property deleted!");
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to delete property!"
            }
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!property)
            return res.status(404).send({ error: "Property not found!" });
        res.status(200).send(property);
    } catch(err){
        return res.status(500).send({ 
            error: {
                name: err.name,
                description: err.message,
                message: "Failed to update property!"
            }
        });
    }
});

module.exports = app => app.use('/property', router);