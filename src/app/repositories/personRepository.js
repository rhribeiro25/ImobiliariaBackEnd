const GenericRepository = require('./genericRepository');
const GenericRepositoryImpl = new GenericRepository();
let MongooseSchema;

class PersonRepository extends GenericRepository {

    setSchema = function (Schema) {
        MongooseSchema = Schema;
        GenericRepositoryImpl.setSchema(Schema);
    }

    findByDoc = async function (doc) {
        return await MongooseSchema.findOne({ "docs.num": doc.num });
    }

}

module.exports = PersonRepository;