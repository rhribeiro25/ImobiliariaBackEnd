import { Model, Document } from 'mongoose';

abstract class GenericRepository {
  public static mongooseSchema: Model<Document>;

  public static setSchema(schema: Model<Document>) {
    this.mongooseSchema = schema;
  }

  public async create(obj: Document, crBy: string) {
    return await GenericRepository.mongooseSchema.create({ ...obj, crBy });
  }

  public async updateOne(params: {}, obj: Document, actionsJson: {}) {
    return await GenericRepository.mongooseSchema.updateOne(params, obj, actionsJson);
  }

  public async findByIdAndUpdate(id: string, obj: Document, actionsJson: {}) {
    return await GenericRepository.mongooseSchema.findByIdAndUpdate(id, { $set: obj }, actionsJson);
  }

  public async remove(conditions: {}) {
    return await GenericRepository.mongooseSchema.remove(conditions);
  }

  public async findByIdAndRemove(id: string) {
    return await GenericRepository.mongooseSchema.findByIdAndRemove(id);
  }

  public async findAll() {
    return await GenericRepository.mongooseSchema.find();
  }

  public async findAllPopulateRelations(relations: string[]) {
    return await GenericRepository.mongooseSchema.find().populate(relations);
  }

  public async findById(id: string) {
    return await GenericRepository.mongooseSchema.findById(id);
  }

  public async findByIdPopulateRelations(id: string, relations: string[]) {
    return await GenericRepository.mongooseSchema.findById(id).populate(relations);
  }
}

export default GenericRepository;
