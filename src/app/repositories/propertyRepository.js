const GenericRepository = require('./genericRepository');
const GenericRepositoryImpl = new GenericRepository();
let MongooseSchema;

class PropertyRepository extends GenericRepository {

    setSchema = function (Schema) {
        MongooseSchema = Schema;
        GenericRepositoryImpl.setSchema(Schema);
    }

    
}

module.exports = PropertyRepository;