import { DocInterface } from "./DocInterface";
import { AddressInterface } from "./AddressInterface";
import { PhoneInterface } from "./PhoneInterface";
import { UserInterface } from "./UserInterface";
import { Document } from "mongoose";

export interface PersonInterface extends Document {
  typeVal: string;
  fName: string;
  lName: string;
  birth: string;
  mother: string;
  father: string;
  email: string;
  rent: Number;
  docs: [DocInterface];
  addresses: [AddressInterface];
  phones: [PhoneInterface];
  crBy: UserInterface;
};