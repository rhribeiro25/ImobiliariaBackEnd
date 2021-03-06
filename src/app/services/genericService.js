let GenericRepositoryImpl;

class GenericService {

    setRepository = function (GenericRepository) {
        GenericRepositoryImpl = GenericRepository;
    }

    findAll = async function () {
        return await GenericRepositoryImpl.findAll();
    }

    findAllPopulateRelations = async function (relations) {
        return await GenericRepositoryImpl.findAllPopulateRelations(relations);
    }
    
    findById = async function (id) {
        return await GenericRepositoryImpl.findById(id);
    }

    findByIdPopulateRelations = async function (id, relations) {
        return await GenericRepositoryImpl.findByIdPopulateRelations(id, relations);
    }

    findByIdAndRemove = async function (id) {
        return await GenericRepositoryImpl.findByIdAndRemove(id);
    }

    remove = async function (id) {
        return await GenericRepositoryImpl.remove(id);
    }

    updateOne = async function (id) {
        return await GenericRepositoryImpl.updateOne(id);
    }
}

module.exports = GenericService;