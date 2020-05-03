import Mongoose, { Document, Schema } from "mongoose";
import { PropertyInterface } from "./PropertyModel";
import { UserInterface } from "./UserModel";
import { PersonInterface } from "./PersonModel";

export interface ContractInterface extends Document {
  started: Date;
  finished: Date;
  people: [PersonInterface];
  property: PropertyInterface;
  crBy: UserInterface;
};

var contractSchema = new Schema(
  {
    started: Date,
    finished: Date,
    people: [
      {
        type: Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    crBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

contractSchema.methods.constructor = function (started: Date, finished: Date): Schema {
  this.started = started;
  this.finished = finished;
  return contractSchema;
};

contractSchema.methods.constructor = function (started: Date, finished: Date, crBy: string): Schema {
  this.started = started;
  this.finished = finished;
  this.crBy = crBy;
  return contractSchema;
};

export default Mongoose.model<ContractInterface>("Contract", contractSchema);
