let GenericRepositoryImpl;

class GenericService {

    constructor(GenericRepository) {
        GenericRepositoryImpl = GenericRepository;
    }

    findAllPopulateRelations = async function (relations) {
        return await GenericRepositoryImpl.findAllPopulateRelations(relations);
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