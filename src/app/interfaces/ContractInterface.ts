import { PropertyInterface } from "./PropertyInterface";
import { UserInterface } from "./UserInterface";
import { PersonInterface } from "./PersonInterface";
import { Document } from "mongoose";

export interface ContractInterface extends Document {
  started: Date;
  finished: Date;
  people: [PersonInterface];
  property: PropertyInterface;
  crBy: UserInterface;
};