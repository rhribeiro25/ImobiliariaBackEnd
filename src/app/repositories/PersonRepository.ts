import  GenericRepository from  './GenericRepository';
import { Model, Document } from 'mongoose';

class PersonRepository extends GenericRepository {
    
    constructor (schema: Model<Document>) {
        super(schema);
    }

    public async findByDoc (doc: string) {
        return await super.mongooseSchema.findOne({ "docs.num": doc });
    }

}

export default PersonRepository;