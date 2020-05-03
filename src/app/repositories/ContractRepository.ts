import GenericRepository from "./GenericRepository";
import { Model, Document } from "mongoose";

class ContractRepository extends GenericRepository {
    
    constructor (schema: Model<Document>) {
        super(schema);
    }
    
}

export default ContractRepository;