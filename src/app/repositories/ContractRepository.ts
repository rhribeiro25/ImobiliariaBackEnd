import GenericRepository from './GenericRepository';
import ContractModel from '@app/models/ContractModel';

class ContractRepository extends GenericRepository {
  private static instance: ContractRepository;

  public static getInstance(): ContractRepository {
    if (!ContractRepository.instance) {
      ContractRepository.instance = new ContractRepository();
    }
    GenericRepository.setSchema(ContractModel);
    return ContractRepository.instance;
  }
}

export default ContractRepository;
