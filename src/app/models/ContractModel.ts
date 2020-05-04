import { Schema, model } from "mongoose";
import { ContractInterface } from "@interfaces/ContractInterface";

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

export default model<ContractInterface>("Contract", contractSchema);
