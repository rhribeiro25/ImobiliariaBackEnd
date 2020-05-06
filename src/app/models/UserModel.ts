import { Schema, model } from 'mongoose';
import { UserInterface } from '@interfaces/UserInterface';

const UserSchema = new Schema(
  {
    typeVal: {
      type: String,
      required: true,
      enum: ['USER', 'ADMIN', 'BROKER'],
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    image: {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    birth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
      select: false,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetExpires: {
      type: Date,
      select: false,
    },
    phones: [
      {
        typeVal: {
          type: String,
          required: true,
          enum: ['CELLPHONE', 'TELEPHONE', 'FAX'],
        },
        ddd: {
          type: String,
          required: true,
        },
        num: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

UserSchema.methods.fullName = function (): string {
  return this.fName + ' ' + this.lName;
};

export default model<UserInterface>('User', UserSchema);
