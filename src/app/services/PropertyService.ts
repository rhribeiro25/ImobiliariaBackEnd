import GenericService from './GenericService'
import PropertyModel, { PropertyInterface } from '@models/PropertyModel';
import PropertyRepository from '@repositories/PropertyRepository';

class PropertyService extends GenericService {

    constructor () {
        super(new PropertyRepository(PropertyModel));
    }

    create = async function (userId: string, newProperty: PropertyInterface) {
        return await super.genericRepository.create(newProperty, userId);
    }

    findByIdAndUpdate = async function (id: string, newProperty: PropertyInterface, actionsJson: JSON) {
        return await super.genericRepository.findByIdAndUpdate(id, { $set: newProperty }, actionsJson);
    }
} 

export default new PropertyService()