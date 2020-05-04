import GenericRepository from "@repositories/GenericRepository";
import { Document } from "mongoose";

abstract class GenericService {

  public genericRepository: GenericRepository;

  protected constructor(repository: GenericRepository) {
    this.genericRepository = repository;
  }

  public setRepository(repository: GenericRepository) {
    this.genericRepository = repository;
  }

  public async findAll() {
    return await this.genericRepository.findAll();
  }

  public async findAllPopulateRelations(relations: string[]) {
    return await this.genericRepository.findAllPopulateRelations(relations);
  }

  public async findById(id: string) {
    return await this.genericRepository.findById(id);
  }

  public async findByIdPopulateRelations(id: string, relations: string[]) {
    return await this.genericRepository.findByIdPopulateRelations(id, relations);
  }

  public async findByIdAndRemove(id: string) {
    return await this.genericRepository.findByIdAndRemove(id);
  }

  public async remove(id: string) {
    return await this.genericRepository.remove(id);
  }

  public async updateOne(id: string, obj: Document, actionsJson: {}) {
    return await this.genericRepository.updateOne(id, obj, actionsJson);
  }

}

export default GenericService;
