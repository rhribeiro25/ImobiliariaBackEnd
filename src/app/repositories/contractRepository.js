const Contract = require('../models/contractModel');

exports.create = async function (newContract, crBy) {
    return await Contract.create({ ...newContract, crBy });
}

exports.findAllPopulateRelations = async function (relations) {
    return await Contract.find().populate([relations]);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await Contract.findById(id).populate([relations]);
}

exports.findByIdAndRemove = async function (id) {
    return await Contract.findByIdAndRemove(id);
}

exports.remove = async function (id) {
    return await Contract.remove(id);
}

exports.findByIdAndUpdate = async function (id, newContract, actionsJson) {
    return await Contract.findByIdAndUpdate(id, newContract, actionsJson);
}

exports.updateOne = async function (id, newContract, actionsJson) {
    return await Contract.updateOne(id, newContract, actionsJson);
}