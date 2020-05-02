const MongooseSchemaPerson = require('../models/personModel');
const MongooseSchemaProperty = require('../models/propertyModel');
const MongooseSchemaContract = require('../models/contractModel');
const GenericService = require('./genericService');
let GenericServiceImpl = new GenericService();
const PersonRepository = require('../repositories/personRepository');
let PersonRepositoryImpl = new PersonRepository();
const PropertyRepository = require('../repositories/propertyRepository');
let PropertyRepositoryImpl = new PropertyRepository();
const ContractRepository = require('../repositories/contractRepository');
let ContractRepositoryImpl = new ContractRepository();

class ContractService extends GenericService {

    setRepository = function () {
        ContractRepositoryImpl.setSchema(MongooseSchemaContract);
        GenericServiceImpl.setRepository(ContractRepositoryImpl);
    }

    setPropertyRepository = function () {
        PropertyRepositoryImpl.setSchema(MongooseSchemaProperty);
        GenericServiceImpl.setRepository(PropertyRepositoryImpl);
    }

    setPersonRepository = function () {
        PersonRepositoryImpl.setSchema(MongooseSchemaPerson);
        GenericServiceImpl.setRepository(PersonRepositoryImpl);
    }

    create = async function (req) {
        const { body, userId } = req;
        let { started, finished, people, property } = body;
        let contract = await ContractRepositoryImpl.create({ started, finished }, userId);
        this.setPersonRepository();
        await Promise.all(people.map(async person => {
            let newPerson = await PersonRepositoryImpl.create(person, userId);
            contract.people.push(newPerson._id);
        }));
        this.setPropertyRepository();
        property.contract = contract._id;
        let newProperty = await PropertyRepositoryImpl.create(property, userId);
        contract.property = newProperty._id;
        this.setRepository();
        return await ContractRepositoryImpl.findByIdAndUpdate(contract._id, contract, { new: true, runValidators: true });
    }

    findByIdAndUpdate = async function (req, actionsJson) {
        let updatedContract;
        let { started, finished, people, property } = req.body;
        let existsContract = await ContractRepositoryImpl.findByIdAndUpdate(req.params.id, {
            started,
            finished,
            upAt: Date.now(),
            crBy: req.userId
        }, { new: true, runValidators: true });

        if (!existsContract)
            return { status: 400, contract: existsContract };

        if (people && people.length > 0) {
            existsContract.people = [];
            this.setPersonRepository();
            await Promise.all(people.map(async person => {
                person.contract = existsContract._id;
                person.updatedAt = Date.now();
                const updatedPerson = await PersonRepositoryImpl.create(person, req.userId);
                existsContract.people.push(updatedPerson);
            }));
        }
        if (property) {
            this.setPropertyRepository();
            await PropertyRepositoryImpl.findByIdAndRemove(existsContract.property._id);
            property.contract = existsContract._id;
            property.updatedAt = Date.now();
            let updatedProperty = await PropertyRepositoryImpl.create(property);
            existsContract.property = updatedProperty._id;

            this.setRepository();
            updatedContract = await ContractRepositoryImpl.findByIdAndUpdate(req.params.id, { $set: existsContract }, actionsJson);
        }
        return { status: 200, contract: updatedContract };
    }
}

module.exports = ContractService;