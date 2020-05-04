import { Model, Document } from "mongoose";

abstract class GenericRepository {

  public mongooseSchema: Model<Document>;

  protected constructor(schema: Model<Document>) {
    this.mongooseSchema = schema;
  }

  public async create(obj: Document, crBy: string) {
    return await this.mongooseSchema.create({ ...obj, crBy });
  }

  public async updateOne(params: {}, obj: Document, actionsJson: {}) {
    return await this.mongooseSchema.updateOne(params, obj, actionsJson);
  }

  public async findByIdAndUpdate(id: string, obj: Document, actionsJson: {}) {
    return await this.mongooseSchema.findByIdAndUpdate(id, { $set: obj, }, actionsJson);
  }

  public async remove(conditions: {}) {
    return await this.mongooseSchema.remove(conditions);
  }

  public async findByIdAndRemove(id: string) {
    return await this.mongooseSchema.findByIdAndRemove(id);
  }

  public async findAll() {
    return await this.mongooseSchema.find();
  }

  public async findAllPopulateRelations(relations: string[]) {
    return await this.mongooseSchema.find().populate(relations);
  }

  public async findById(id: string) {
    return await this.mongooseSchema.findById(id);
  }

  public async findByIdPopulateRelations(id: string, relations: string[]) {
    return await this.mongooseSchema.findById(id).populate(relations);
  }

}

export default GenericRepository;