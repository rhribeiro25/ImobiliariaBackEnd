import GenericService from './GenericService';
import { PropertyInterface } from '@interfaces/PropertyInterface';
import PropertyRepository from '@app/repositories/PropertyRepository';

class PropertyService extends GenericService {
  private static instance: PropertyService;
  private propertyRepository = PropertyRepository.getInstance();

  constructor() {
    super(PropertyRepository.getInstance());
  }

  public async create(newProperty: PropertyInterface, userId: string) {
    return await this.propertyRepository.create(newProperty, userId);
  }

  public async findByIdAndUpdate(id: string, newProperty: PropertyInterface, actionsJson: {}) {
    return await this.propertyRepository.findByIdAndUpdate(id, newProperty, actionsJson);
  }

  public static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }
}

export default PropertyService;
