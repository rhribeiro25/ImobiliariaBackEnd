import  GenericRepository from  './GenericRepository';
import { Model, Document } from 'mongoose';

class UserRepository extends GenericRepository {

    constructor (schema: Model<Document>) {
        super(schema);
    }

    public create = async function (newUser: Model<Document>) {
        return await super.mongooseSchema.create(newUser);
    }

    public findByMail = async function (email: string, selectAttributes: string) {
        return await super.mongooseSchema.findOne({ email }).select(selectAttributes);
    }
}

export default UserRepository;