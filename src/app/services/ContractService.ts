import ContractRepository from '@repositories/ContractRepository';
import PersonRepository from '@repositories/PersonRepository';
import PropertyRepository from '@repositories/PropertyRepository';
import PersonModel, { PersonInterface } from '@models/PersonModel';
import ContractModel, { ContractInterface } from '@models/ContractModel';
import PropertyModel from '@models/PropertyModel';
import GenericService from './GenericService';

class ContractService extends GenericService {

    constructor () {
        super(new ContractRepository(ContractModel));
    }

    public async create (contract: ContractInterface, userId: string) {
        let { started, finished, people, property } = contract;
        let newContract = ContractModel.constructor(started, finished);
        newContract = await super.genericRepository.create(newContract, userId);

        super.setRepository(new PersonRepository(PersonModel));
        await Promise.all(people.map(async p => {
            let newPerson = await super.genericRepository.create(p, userId);
            newContract.people.push(newPerson._id);
        }));

        super.setRepository(new PropertyRepository(PropertyModel));
        property.contract = contract._id;
        let newProperty = await super.genericRepository.create(property, userId);

        super.setRepository(new ContractRepository(ContractModel));
        newContract.property = newProperty._id;
        return await super.genericRepository.findByIdAndUpdate(newContract._id, newContract, { new: true, runValidators: true });
    }

    public async findByIdAndUpdate (id: string, contract: ContractInterface, userId: string, actionsJson: JSON) {
        let updatedContract;
        let { started, finished, people, property } = contract;
        let existsContract = ContractModel.constructor(started, finished, userId);
        existsContract = await super.genericRepository.findByIdAndUpdate(id, existsContract, { new: true, runValidators: true });

        if (!existsContract)
            return { status: 400, contract: existsContract };

        if (people && people.length > 0) {
            existsContract.people = [];
            super.setRepository(new PersonRepository(PersonModel));
            await Promise.all(people.map(async p => {
                const updatedPerson = await super.genericRepository.create(p, userId);
                existsContract.people.push(updatedPerson);
            }));
        }
        if (property) {
            super.setRepository(new ContractRepository(ContractModel));
            await super.genericRepository.findByIdAndRemove(existsContract.property._id);
            property.contract = existsContract._id;
            super.setRepository(new PropertyRepository(PropertyModel));
            let updatedProperty = await super.genericRepository.create(property, userId);
            existsContract.property = updatedProperty._id;
            super.setRepository(new ContractRepository(ContractModel));
            updatedContract = await super.genericRepository.findByIdAndUpdate(id, { $set: existsContract }, actionsJson);
        }
        return { status: 200, contract: updatedContract };
    }
}

export default new ContractService()