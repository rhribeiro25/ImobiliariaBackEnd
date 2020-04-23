const express = require('express');
const authMiddleware = require("../middlewares/auth")
const Property = require('../models/property');
const router = express.Router();
router.use(authMiddleware);

router.post('/create', async (req, res) => {
    try{
        const property = await Property.create(req.body);
        return res.status(201).send({ property });
    } catch(err){
        return res.status(500).send({ error: "Failed to create property!" });
    }
});

router.get('/list', async (req, res) => {
    try {
        await Property.find().populate(["user", "contract"]).exec((err, properties) => {
            if (err)
                return res.status(500).send({ error: "Failed to find properties!" });
            else if(!properties)
                return res.status(404).send({ error: "People not found!" });
            else
                return res.status(200).send(properties);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to list properties!" });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        await Property.findById(req.params.id).populate(["user", "contract"]).exec((err, property) => {
            if (err)
                return res.status(500).send({ error: "Failed to find property!" });
            else if(!property)
                return res.status(404).send({ error: "Property not found!" });
            else
                res.status(200).send(property);
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to show property!" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Property.findByIdAndRemove(req.params.id, (err, property) => {
            if (err)
                res.status(500).send({error: "Failed to delete property!"});
            else if(!property)
                return res.status(404).send({ error: "Property not found!" });
            else
                res.status(200).send("Successful property deleted!");
        })
    } catch (error) {
        res.status(500).send({ error: "Failed to delete people!" });
    }
});

router.put('/update/:id', async (req, res) => {
    Property.findById(req.params.id, (err, property) => {
        if (err)
            return res.status(404).send({ error: "Property not found!" });
        else if (!property)
            return res.status(404).send({ error: "Property not found!" });
        else {
            let cont = new Property(req.body);
            if (cont.id === property.id) {
                cont.save()
                    .then((cont) => res.status(200).send(cont))
                    .catch((e) => res.status(500).send(e));
            }
        }
    })
});

module.exports = app => app.use('/properties', router);