import GenericRepository from './GenericRepository';
import { UserInterface } from '@interfaces/UserInterface';
import UserModel from '@app/models/UserModel';

class UserRepository extends GenericRepository {
  private static instance: UserRepository;

  public async create(newUser: UserInterface) {
    return await GenericRepository.mongooseSchema.create(newUser);
  }

  public async findByMail(email: string, selectAttributes: string) {
    return await GenericRepository.mongooseSchema.findOne({ email }).select(selectAttributes);
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    GenericRepository.setSchema(UserModel);
    return UserRepository.instance;
  }
}

export default UserRepository;
