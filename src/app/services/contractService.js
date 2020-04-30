const ContractRepository = require('../repositories/contractRepository');
const PersonRepository = require('../repositories/personRepository');
const PropertyRepository = require('../repositories/propertyRepository');

exports.create = async function (req) {
    const { body, userId } = req;
    let { started, finished, people, property } = body;
    let contract = await ContractRepository.create({ started, finished }, userId);
    await Promise.all(people.map(async person => {
        let newPerson = await PersonRepository.create(person, userId);
        contract.people.push(newPerson._id);
    }));
    property.contract = contract._id;
    let newProperty = await PropertyRepository.create(property, userId);
    contract.property = newProperty._id;
    return await ContractRepository.findByIdAndUpdate(contract._id, contract, { new: true, runValidators: true });
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
    let updatedContract;
    let { started, finished, people, property } = req.body;
    let existsContract = await ContractRepository.findByIdAndUpdate(req.params.id, {
        started,
        finished,
        upAt: Date.now(),
        crBy: req.userId
    }, { new: true, runValidators: true });
    if (!existsContract) {
        return { status: 400, contract: existsContract };
    } 
    if(people && people.length > 0){
        existsContract.people = [];
        await Promise.all(people.map(async person => {
            person.contract = existsContract._id;
            person.updatedAt = Date.now();
            const updatedPerson = await PersonRepository.create(person, req.userId);
            existsContract.people.push(updatedPerson);
        }));
    }
    if(property){
        await PropertyRepository.findByIdAndRemove(existsContract.property._id);
        property.contract = existsContract._id;
        property.updatedAt = Date.now();
        let updatedProperty = await PropertyRepository.create(property);
        existsContract.property = updatedProperty._id;
        updatedContract = await ContractRepository.findByIdAndUpdate(req.params.id, { $set: existsContract }, actionsJson);
    }
    return { status: 200, contract: updatedContract };
}