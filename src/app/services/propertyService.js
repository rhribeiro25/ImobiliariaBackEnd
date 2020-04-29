const PropertyRepository = require('../repositories/propertyRepository');

exports.create = async function (req) {
    const { body, userId } = req;
    return property = await PropertyRepository.create(body, userId);
}

exports.findAllPopulateRelations = async function (relations) {
    return await PropertyRepository.findAllPopulateRelations(relations);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await PropertyRepository.findByIdPopulateRelations(id, relations);
}

exports.findByIdAndRemove = async function (id) {
    return await PropertyRepository.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (req, actionsJson) {
    let newProperty = req.body;
    newProperty.upAt = Date.now();
    return await PropertyRepository.findByIdAndUpdate(req.params.id, { $set: newProperty }, actionsJson);
}