const PersonRepository = require('../repositories/personRepository');

exports.create = async function (req) {
    const { body, userId } = req;
    let newPerson = body;
    let existsPerson = await this.findByDoc(newPerson.docs);
    let person;
    let status;
    if (existsPerson) {
        person = await PersonRepository.findByIdAndUpdate(existsPerson._id, newPerson, { new: true, runValidators: true });
        status = 200;
    }
    else {
        person = await PersonRepository.create(newPerson, userId);
        status = 201;
    }
    return { status, person };
}

exports.findByDoc = async function (docs) {
    let existsDoc;
    await Promise.all(docs.map(async doc => {
        if (doc.typeVal === "CPF" || doc.typeVal === "CNPJ")
            existsDoc = doc;
    }));
    return await PersonRepository.findByDoc(existsDoc);
}

exports.findAllPopulateRelations = async function (relations) {
    return await PersonRepository.findAllPopulateRelations(relations);
}

exports.findByIdPopulateRelations = async function (id, relations) {
    return await PersonRepository.findByIdPopulateRelations(id, relations);
}

exports.findByIdAndRemove = async function (id) {
    return await PersonRepository.findByIdAndRemove(id);
}

exports.findByDocAndUpdate = async function (req, actionsJson) {
    const { body } = req;
    let newPerson = body;
    let existsPerson = await this.findByDoc(newPerson.docs);
    let updatedPerson;
    let status;
    if (existsPerson) {
        newPerson.updatedAt = Date.now();
        updatedPerson = await PersonRepository.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true });
        status = 200;
    }
    else {
        status = 400;
    }
    return { status, person: updatedPerson };
}