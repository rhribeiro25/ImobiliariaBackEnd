import GenericService from "./GenericService";
import PersonRepository from "@repositories/PersonRepository";
import PersonModel from "@models/PersonModel";

class PersonService extends GenericService {
  
  constructor () {
    super(new PersonRepository(PersonModel));
  }

  create = async function (req) {
    const { body, userId } = req;
    let newPerson = body;
    let existsPerson = await this.findByDoc(newPerson.docs);
    let person;
    let status;
    if (existsPerson) {
      person = await super.genericRepository.findByIdAndUpdate(
        existsPerson._id,
        newPerson,
        { new: true, runValidators: true }
      );
      status = 200;
    } else {
      person = await super.genericRepository.create(newPerson, userId);
      status = 201;
    }
    return { status, person };
  };

  findByDoc = async function (docs: [Document]) {
    existsDoc: Document;
    await Promise.all(
      docs.map(async (doc) => {
        if (doc.typeVal === "CPF" || doc.typeVal === "CNPJ") existsDoc = doc;
      })
    );
    return await super.genericRepository.findByDoc(existsDoc.num);
  };

  findByIdAndUpdate = async function (req, actionsJson) {
    const { body } = req;
    let newPerson = body;
    let existsPerson = await this.findByDoc(newPerson.docs);
    let updatedPerson;
    let status;
    if (existsPerson) {
      newPerson.upAt = Date.now();
      updatedPerson = await super.genericRepository.findByIdAndUpdate(
        req.params.id,
        { $set: newPerson },
        actionsJson
      );
      status = 200;
    } else {
      status = 400;
    }
    return { status, person: updatedPerson };
  };
}

export default new PersonService();
