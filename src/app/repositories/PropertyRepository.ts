import GenericRepository from "./GenericRepository";
import { Model, Document } from "mongoose";

class PropertyRepository extends GenericRepository {
    
    constructor (schema: Model<Document>) {
        super(schema);
    }
}

export default PropertyRepository;