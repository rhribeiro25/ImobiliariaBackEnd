const mongoose = require('../../database');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    typeVal: {
        type: String,
        required: true,
        enum: ["LOCATOR", "TENANT", "WITNESS"]
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    birth: {
        type: String
    },
    mother: {
        type: String
    },
    father: {
        type: String
    },
    email: {
        type: String
    },
    rent: Number,
    docs: [{
        typeVal: {
            type: String,
            required: true,
            enum: ["CPF", "IDENTITY", "CNPJ", "PASSPORT"]
        },
        num: {
            type: String,
            required: true
        },
        send: {
            type: Date
        },
        due: {
            type: Date
        },
        files: [{
            name: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        }]
    }],
    addresses: [{
        typeVal: {
            type: String,
            required: true,
            enum: ["OFFICIAL", "CORRESPONDENCE"]
        },
        street: {
            type: String,
            required: true
        },
        district: {
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
        num: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        compl: {
            type: String
        }
    }],
    phones: [{
        typeVal: {
            type: String,
            required: true,
            enum: ["CELLPHONE", "TELEPHONE", "FAX"]
        },
        ddd: {
            type: String,
            required: true
        },
        num: {
            type: String,
            required: true
        }
    }],
    crBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    crAt: {
        type: Date,
        default: Date.now
    },
    upAt: {
        type: Date,
    }
}, { versionKey: false });

module.exports = mongoose.model("Person", personSchema);