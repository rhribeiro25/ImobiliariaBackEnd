const GenericRepository = require('./genericRepository');
let MongooseSchema;

class PersonRepository extends GenericRepository {

    constructor(Schema) {
        MongooseSchema = Schema;
        super(Schema);
    }

    findByDoc = async function (doc) {
        return await MongooseSchema.findOne({ "docs.num": doc.num });
    }

}

module.exports = PersonRepository;