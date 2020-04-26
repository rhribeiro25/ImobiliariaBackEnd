const Person = require('../models/person');

exports.create = async function (newPerson) {
    let personExists;
    let person;
    const { docs } = newPerson;
    await Promise.all(docs.map(async doc => {
        if(doc.typeVal === "CPF" || doc.typeVal === "CNPJ")
            personExists = await Person.findOne({ "docs.num": doc.num })
    }));
    if(personExists) {
        person = await Person.findByIdAndUpdate(personExists._id, newPerson, { new: true, runValidators: true });
        return { status: 200, person: person };
    }
    else {
        person = await Person.create({ ...newPerson, crBy: req.userId });
        return { status: 200, person: person };
    }
}