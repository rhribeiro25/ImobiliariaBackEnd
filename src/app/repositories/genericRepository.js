let MongooseSchema;

class GenericRepository {

    setSchema = function (Schema) {
        MongooseSchema = Schema;
    }

    create = async function (obj, crBy) {
        return await MongooseSchema.create({ ...obj, crBy });
    }

    updateOne = async function (id, obj, actionsJson) {
        return await MongooseSchema.updateOne(id, obj, actionsJson);
    }

    findByIdAndUpdate = async function (id, obj, actionsJson) {
        return await MongooseSchema.findByIdAndUpdate(id, obj, actionsJson);
    }

    remove = async function (conditions) {
        return await MongooseSchema.remove(conditions);
    }

    findByIdAndRemove = async function (id) {
        return await MongooseSchema.findByIdAndRemove(id);
    }

    findAll = async function () {
        return await MongooseSchema.find();
    }

    findAllPopulateRelations = async function (relations) {
        return await MongooseSchema.find().populate(relations);
    }

    findById = async function (id) {
        return await MongooseSchema.findById(id);
    }

    findByIdPopulateRelations = async function (id, relations) {
        return await MongooseSchema.findById(id).populate(relations);
    }

}

module.exports = GenericRepository;