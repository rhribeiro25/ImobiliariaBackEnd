import { Document } from 'mongoose';
import { PersonInterface } from './PersonInterface';
import { PropertyInterface } from './PropertyInterface';
import { UserInterface } from './UserInterface';

export interface ContractInterface extends Document {
  started: Date;
  finished: Date;
  people: [PersonInterface];
  property: PropertyInterface;
  crBy: UserInterface;
}
