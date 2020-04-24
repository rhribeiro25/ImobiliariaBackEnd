const mongoose = require('../../database');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    typePerson: {
        type: String,
        required: true,
        enum: ["LOCATOR", "TENANT", "WITNESS"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    motherName: {
        type: String
    },
    fatherName: {
        type: String
    },
    email: {
        type: String
    },
    rent: Number,
    documents: [{
        typeDocument: {
            type: String,
            required: true,
            enum: ["CPF", "IDENTITY", "CNPJ", "PASSPORT"]
        },
        digit: {
            type: String,
            required: true
        },
        shippingDate: {
            type: Date
        },
        dueDate: {
            type: Date
        }
    }],
    addresses: [{
        typeAddress: {
            type: String,
            required: true,
            enum: ["OFFICIAL", "CORRESPONDENCE"]
        },
        street: {
            type: String,
            required: true
        },
        neighborhoods: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        complement: {
            type: String
        }
    }],
    phoneNumbers: [{
        typePhone: {
            type: String,
            required: false,
            enum: ["CELLPHONE", "TELEPHONE", "FAX"]
        },
        ddd: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            required: false
        }
    }],
    contract: {
        type: Schema.Types.ObjectId, 
        ref: "Contract"
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, { versionKey: false });

module.exports = mongoose.model("Person", personSchema);