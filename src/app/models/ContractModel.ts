import { Schema, model } from 'mongoose';
import { ContractInterface } from '@interfaces/ContractInterface';

var contractSchema = new Schema(
  {
    started: Date,
    finished: Date,
    people: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    crBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default model<ContractInterface>('Contract', contractSchema);
