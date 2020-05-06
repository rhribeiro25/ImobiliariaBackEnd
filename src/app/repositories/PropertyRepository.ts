import GenericRepository from './GenericRepository';
import PropertyModel from '@app/models/PropertyModel';

class PropertyRepository extends GenericRepository {
  private static instance: PropertyRepository;

  public static getInstance(): PropertyRepository {
    if (!PropertyRepository.instance) {
      PropertyRepository.instance = new PropertyRepository();
    }
    GenericRepository.setSchema(PropertyModel);
    return PropertyRepository.instance;
  }
}

export default PropertyRepository;
