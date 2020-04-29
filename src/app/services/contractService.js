const ContractRepository = require('../repositories/contractRepository');
const PersonRepository = require('../repositories/personRepository');
const PropertyRepository = require('../repositories/propertyRepository');
const Person = require('../models/personModel');
const Contract = require('../models/contractModel');
const Property = require('../models/propertyModel');

exports.create = async function (req) {
    const { startDate, finishDate, people, property } = req.body;
    const contract = await ContractRepository.create({ startDate, finishDate, user: req.userId });
    await Promise.all(people.map(async contract => {
        const personContract = new Contract({ ...person, contract: contract.id });
        await PersonRepository.create(personContract);
        contract.people.push(personContract);
    }));
    const propertyContract = new Property({ ...property, contract: contract.id });
    await PropertyRepository.create(propertyContract);
    contract.property = propertyContract;
    await ContractRepository.updateOne(contract._id, contract, {});
    return contract;
}

exports.findAllPopulateRelations = async function (relations) {
    return await ContractRepository.findAllPopulateRelations(relations);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await ContractRepository.findByIdPopulateRelations(id, relations);
}

exports.findByIdAndRemove = async function (id) {
    return await ContractRepository.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (req, actionsJson) {
    req.body.updatedAt = Date.now();
    const { startDate, finishDate, people, property } = req.body;
    let newContract = await ContractRepository.findByIdAndUpdate(req.params.id, {
        startDate,
        finishDate,
        user: req.userId
    }, { new: true, runValidators: true });
    let status;
    if (newContract) {
        if(people && people.length > 0){
            newContract.people = [];
            await PersonRepository.remove(newContract._id);
            await Promise.all(people.map(async person => {
                const personContract = new Person({ ...person, contract: newContract.id });
                personContract.updatedAt = Date.now();
                await PersonRepository.create(personContract);
                newContract.people.push(personContract);
            }));
        }
        if(property){
            await PropertyRepository.remove(newContract._id);
            const propertyContract = new Property({ ...property, contract: newContract.id });
            propertyContract.updatedAt = Date.now();
            await PropertyRepository.create(propertyContract);
            newContract.property = propertyContract;
        }
    } else
        status = 400;
        UserRepository.findByIdAndUpdate(req.params.id, { $set: newUser }, actionsJson);
        const updatedContract = await ContractRepository.findByIdAndUpdate(newContract._id, { $set: newContract }, actionsJson);
    return { status, contract: updatedContract };
}