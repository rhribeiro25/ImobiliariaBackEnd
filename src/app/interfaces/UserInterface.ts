import { Document } from 'mongoose';
import { ImageInterface } from './ImageInterface';
import { PhoneInterface } from './PhoneInterface';

export interface UserInterface extends Document {
  typeVal: string;
  fName: string;
  lName: string;
  birth?: string;
  email: string;
  pass: string;
  resetToken?: string;
  resetExpires?: Date;
  image: ImageInterface;
  phones: [PhoneInterface];
}
