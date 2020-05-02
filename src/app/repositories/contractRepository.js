const GenericRepository = require('./genericRepository');
const GenericRepositoryImpl = new GenericRepository();
let MongooseSchema;

class ContractRepository extends GenericRepository {

    setSchema = function (Schema) {
        MongooseSchema = Schema;
        GenericRepositoryImpl.setSchema(Schema);
    }
    
}

module.exports = ContractRepository;