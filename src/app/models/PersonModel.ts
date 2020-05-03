import Mongoose, { Document, Schema } from "mongoose";
import { UserInterface } from "./UserModel";

export interface PersonInterface extends Document {
  typeVal: string;
  fName: string;
  lName: string;
  birth: string;
  mother: string;
  father: string;
  email: string;
  rent: Number;
  docs: [
    {
      typeVal: string;
      num: string;
      send: Date;
      due: Date;
      files: [
        {
          name: string;
          path: string;
        }
      ];
    }
  ];
  addresses: [
    {
      typeVal: string;
      street: string;
      district: string;
      city: string;
      state: string;
      num: string;
      cep: string;
      compl: string;
    }
  ];
  phones: [
    {
      typeVal: string;
      ddd: string;
      num: string;
    }
  ];
  crBy: UserInterface;
};

const personSchema = new Schema(
  {
    typeVal: {
      type: String,
      required: true,
      enum: ["LOCATOR", "TENANT", "WITNESS"],
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
    },
    mother: {
      type: String,
    },
    father: {
      type: String,
    },
    email: {
      type: String,
    },
    rent: Number,
    docs: [
      {
        typeVal: {
          type: String,
          required: true,
          enum: ["CPF", "IDENTITY", "CNPJ", "PASSPORT"],
        },
        num: {
          type: String,
          required: true,
        },
        send: {
          type: Date,
        },
        due: {
          type: Date,
        },
        files: [
          {
            name: {
              type: String,
              required: true,
            },
            path: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    addresses: [
      {
        typeVal: {
          type: String,
          required: true,
          enum: ["OFFICIAL", "CORRESPONDENCE"],
        },
        street: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        num: {
          type: String,
          required: true,
        },
        cep: {
          type: String,
          required: true,
        },
        compl: {
          type: String,
        },
      },
    ],
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
    crBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default Mongoose.model<PersonInterface>("Person", personSchema);
