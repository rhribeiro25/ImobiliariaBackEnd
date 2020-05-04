import GenericService from './GenericService'
import PropertyRepository from '@repositories/PropertyRepository';
import PropertyModel from '@models/PropertyModel';
import { PropertyInterface } from '@interfaces/PropertyInterface';

class PropertyService extends GenericService {
  
  private static instance: PropertyService;
  
  constructor() {
    super(new PropertyRepository(PropertyModel));
  }

  public async create(newProperty: PropertyInterface, userId: string) {
    return await super.genericRepository.create(newProperty, userId);
  }

  public async findByIdAndUpdate(id: string, newProperty: PropertyInterface, actionsJson: {}) {
    return await super.genericRepository.findByIdAndUpdate(id, newProperty, actionsJson);
  }

  public static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }
}

export default PropertyService;