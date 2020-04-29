const Person = require('../models/personModel');

exports.create = async function (newPerson, crBy) {
    return await Person.create({ ...newPerson, crBy });
}

exports.findByDoc = async function (doc) {
    return await Person.findOne({ "docs.num": doc.num });
}

exports.findAllPopulateRelations = async function (relations) {
    return await Person.find().populate([relations]);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await Person.findById(id).populate([relations]);
}

exports.findByIdAndRemove = async function (id) {
    return await Person.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (id, newPerson, actionsJson) {
    return await Person.findByIdAndUpdate(id, newPerson, actionsJson);
}

exports.remove = async function (id) {
    return await Person.remove(id);
}

exports.updateOne = async function (id, newPerson, actionsJson) {
    return await Person.updateOne(id, newPerson, actionsJson);
}