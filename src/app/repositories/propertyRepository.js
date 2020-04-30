const Property = require('../models/propertyModel');

exports.create = async function (newProperty, crBy) {
    return await Property.create({ ...newProperty, crBy });
}

exports.findAllPopulateRelations = async function (relations) {
    return await Property.find().populate(relations);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await Property.findById(id).populate(relations);
}

exports.findByIdAndRemove = async function (id) {
    return await Property.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (id, newProperty, actionsJson) {
    return await Property.findByIdAndUpdate(id, newProperty, actionsJson);
}

exports.remove = async function (conditions) {
    return await Person.remove(conditions);
}

exports.updateOne = async function (id, newPerson, actionsJson) {
    return await Person.updateOne(id, newPerson, actionsJson);
}