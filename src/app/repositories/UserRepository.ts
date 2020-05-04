import  GenericRepository from  './GenericRepository';
import { Model, Document } from 'mongoose';
import { UserInterface } from '@interfaces/UserInterface';

class UserRepository extends GenericRepository {

    constructor (schema: Model<Document>) {
        super(schema);
    }

    public async create (newUser: UserInterface) {
        return await super.mongooseSchema.create(newUser);
    }

    public async findByMail (email: string, selectAttributes: string) {
        return await super.mongooseSchema.findOne({ email }).select(selectAttributes);
    }
}

export default UserRepository;