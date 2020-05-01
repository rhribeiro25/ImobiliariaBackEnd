let MongooseSchema;

class GenericRepository {
    
    constructor(Schema) {
        MongooseSchema = Schema;
    }

    create = async function (obj, crBy) {
        return await MongooseSchema.create({ ...obj, crBy });
    }

    updateOne = async function (id, obj, actionsJson) {
        return await MongooseSchema.updateOne(id, obj, actionsJson);
    }
    
    remove = async function (conditions) {
        return await MongooseSchema.remove(conditions);
    }

    findByIdAndUpdate = async function (id, obj, actionsJson) {
        return await MongooseSchema.findByIdAndUpdate(id, obj, actionsJson);
    }
    
    findAllPopulateRelations = async function (relations) {
        return await MongooseSchema.find().populate(relations);
    }

    findByIdPopulateRelations = async function (id, relations) {
        return await MongooseSchema.findById(id).populate(relations);
    }

    findByIdAndRemove = async function (id) {
        return await MongooseSchema.findByIdAndRemove(id);
    }
}

module.exports = GenericRepository;