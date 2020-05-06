import GenericService from './GenericService';
import PersonRepository from '@repositories/PersonRepository';
import { PersonInterface } from '@interfaces/PersonInterface';
import { DocInterface } from '@interfaces/DocInterface';

class PersonService extends GenericService {
  private static instance: PersonService;
  private PersonRepository = PersonRepository.getInstance();

  constructor() {
    super(PersonRepository.getInstance());
  }

  public async create(newPerson: PersonInterface, userId: string) {
    let existsPerson = await this.findByDoc(newPerson.docs);
    let person;
    let status;
    if (existsPerson) {
      person = await this.PersonRepository.findByIdAndUpdate(existsPerson._id, newPerson, { new: true, runValidators: true });
      status = 200;
    } else {
      person = await this.PersonRepository.create(newPerson, userId);
      status = 201;
    }
    return { status, person };
  }

  public async findByDoc(docs: [DocInterface]) {
    let docNumber: string = '';
    await Promise.all(
      docs.map(async doc => {
        if (doc.typeVal === 'CPF' || doc.typeVal === 'CNPJ') docNumber = doc.num;
      }),
    );
    return await this.PersonRepository.findByDoc(docNumber);
  }

  public async findByIdAndUpdate(id: string, newPerson: PersonInterface, actionsJson: {}) {
    let existsPerson = await this.findByDoc(newPerson.docs);
    let updatedPerson;
    let status;
    if (existsPerson) {
      updatedPerson = await this.PersonRepository.findByIdAndUpdate(id, newPerson, actionsJson);
      status = 200;
    } else {
      status = 400;
    }
    return { status, person: updatedPerson };
  }

  public static getInstance(): PersonService {
    if (!PersonService.instance) {
      PersonService.instance = new PersonService();
    }
    return PersonService.instance;
  }
}

export default PersonService;
