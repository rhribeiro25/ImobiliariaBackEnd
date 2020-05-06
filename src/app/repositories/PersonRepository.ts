import GenericRepository from './GenericRepository';
import PersonModel from '@app/models/PersonModel';

class PersonRepository extends GenericRepository {
  private static instance: PersonRepository;

  public async findByDoc(doc: string) {
    return await GenericRepository.mongooseSchema.findOne({ 'docs.num': doc });
  }

  public static getInstance(): PersonRepository {
    if (!PersonRepository.instance) {
      PersonRepository.instance = new PersonRepository();
    }
    GenericRepository.setSchema(PersonModel);
    return PersonRepository.instance;
  }
}

export default PersonRepository;
