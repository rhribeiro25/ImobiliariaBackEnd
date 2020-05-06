import GenericRepository from '@repositories/GenericRepository';
import { Document } from 'mongoose';

abstract class GenericService {
  public static genericRepository: GenericRepository;

  protected constructor(repository: GenericRepository) {
    GenericService.genericRepository = repository;
  }

  public setRepository(repository: GenericRepository) {
    GenericService.genericRepository = repository;
  }

  public async findAll() {
    return await GenericService.genericRepository.findAll();
  }

  public async findAllPopulateRelations(relations: string[]) {
    return await GenericService.genericRepository.findAllPopulateRelations(relations);
  }

  public async findById(id: string) {
    return await GenericService.genericRepository.findById(id);
  }

  public async findByIdPopulateRelations(id: string, relations: string[]) {
    return await GenericService.genericRepository.findByIdPopulateRelations(id, relations);
  }

  public async findByIdAndRemove(id: string) {
    return await GenericService.genericRepository.findByIdAndRemove(id);
  }

  public async remove(id: string) {
    return await GenericService.genericRepository.remove(id);
  }

  public async updateOne(id: string, obj: Document, actionsJson: {}) {
    return await GenericService.genericRepository.updateOne(id, obj, actionsJson);
  }
}

export default GenericService;
