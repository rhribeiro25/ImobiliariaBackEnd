const MongooseSchema = require('../models/personModel');
const GenericService = require('./genericService');
const GenericServiceImpl = new GenericService();
const PersonRepository = require('../repositories/personRepository');
const PersonRepositoryImpl = new PersonRepository();

class PersonService extends GenericService {

    setRepository = function () {
        PersonRepositoryImpl.setSchema(MongooseSchema);
        GenericServiceImpl.setRepository(PersonRepositoryImpl);
    }

    create = async function (req) {
        const { body, userId } = req;
        let newPerson = body;
        let existsPerson = await this.findByDoc(newPerson.docs);
        let person;
        let status;
        if (existsPerson) {
            person = await PersonRepositoryImpl.findByIdAndUpdate(existsPerson._id, newPerson, { new: true, runValidators: true });
            status = 200;
        }
        else {
            person = await PersonRepositoryImpl.create(newPerson, userId);
            status = 201;
        }
        return { status, person };
    }

    findByDoc = async function (docs) {
        let existsDoc;
        await Promise.all(docs.map(async doc => {
            if (doc.typeVal === "CPF" || doc.typeVal === "CNPJ")
                existsDoc = doc;
        }));
        return await PersonRepositoryImpl.findByDoc(existsDoc);
    }

    findByIdAndUpdate = async function (req, actionsJson) {
        const { body } = req;
        let newPerson = body;
        let existsPerson = await this.findByDoc(newPerson.docs);
        let updatedPerson;
        let status;
        if (existsPerson) {
            newPerson.upAt = Date.now();
            updatedPerson = await PersonRepositoryImpl.findByIdAndUpdate(req.params.id, { $set: newPerson }, actionsJson);
            status = 200;
        }
        else {
            status = 400;
        }
        return { status, person: updatedPerson };
    }
}

module.exports = PersonService;