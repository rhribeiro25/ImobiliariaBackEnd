import { ImageInterface } from "./ImageInterface";
import { PhoneInterface } from "./PhoneInterface";
import { Document } from "mongoose";

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
};