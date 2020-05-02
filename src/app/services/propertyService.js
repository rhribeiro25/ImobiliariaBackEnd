const MongooseSchema = require('../models/propertyModel');
const GenericService = require('./genericService');
const GenericServiceImpl = new GenericService();
const PropertyRepository = require('../repositories/propertyRepository');
const PropertyRepositoryImpl = new PropertyRepository();

class PropertyService extends GenericService {

    setRepository = function () {
        PropertyRepositoryImpl.setSchema(MongooseSchema);
        GenericServiceImpl.setRepository(PropertyRepositoryImpl);
    }

    create = async function (req) {
        const { body, userId } = req;
        return await PropertyRepositoryImpl.create(body, userId);
    }

    findByIdAndUpdate = async function (req, actionsJson) {
        let newProperty = req.body;
        newProperty.upAt = Date.now();
        return await PropertyRepositoryImpl.findByIdAndUpdate(req.params.id, { $set: newProperty }, actionsJson);
    }
} 

module.exports = PropertyService;