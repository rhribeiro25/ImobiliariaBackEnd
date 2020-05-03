import Mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  typeVal: string;
  fName: string;
  lName: string;
  birth?: string;
  email: string;
  pass: string;
  resetToken?: string;
  resetExpires?: string;
  image: {
    name: string;
    path: string;
  };
  phones: [
    {
      typeVal: string;
      ddd: string;
      num: string;
    }
  ];
};

const UserSchema = new Schema(
  {
    typeVal: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN", "BROKER"],
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
      type: String,
      select: false,
    },
    phones: [
      {
        typeVal: {
          type: String,
          required: true,
          enum: ["CELLPHONE", "TELEPHONE", "FAX"],
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
  { timestamps: true }
);

UserSchema.methods.fullName = function (): string {
  return this.fName + " " + this.lName;
};

export default Mongoose.model<UserInterface>("User", UserSchema);
