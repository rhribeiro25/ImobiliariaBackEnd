const Person = require('../models/personModel');

exports.create = async function(newPerson, crBy) {
    const person = await Person.create({ ...newPerson, crBy });
    return { status: 200, person: person };
}

exports.findByIdAndUpdate = async function(id, existsPerson) {
    const person = await Person.findByIdAndUpdate(id, existsPerson, { new: true, runValidators: true });
    return { status: 200, person: person };
}

exports.findByDoc = async function(doc) {
    const person = await Person.findOne({ "docs.num": doc.num });
    return person;
}

exports.findAllPopulateRelations = async function(relations){
    return await Person.find().populate([relations]);
}

exports.findByIdPopulateRelations = async function(id, relations){
    return await Person.findById(id).populate([relations]);
}

exports.findByIdAndRemove = async function(id){
    return await Person.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function(id, existsPerson, actionsJson){
    return await Person.findByIdAndUpdate(id, existsPerson, actionsJson);
}