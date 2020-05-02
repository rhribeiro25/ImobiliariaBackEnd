const GenericRepository = require('./genericRepository');
const GenericRepositoryImpl = new GenericRepository();
let MongooseSchema;

class UserRepository extends GenericRepository {

    setSchema = function (Schema) {
        MongooseSchema = Schema;
        GenericRepositoryImpl.setSchema(Schema);
    }

    create = async function (newUser) {
        return await MongooseSchema.create(newUser);
    }

    findByMail = async function (email, selectAttributes) {
        return await MongooseSchema.findOne({ email }).select(selectAttributes);
    }

    
}

module.exports = UserRepository;