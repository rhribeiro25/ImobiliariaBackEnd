const mongoose = require('../../database');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["LOCATOR", "TENANT", "WITNESS", "USER", "ADMIN"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
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
    password: {
        type: String,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    documents: [{
        type: {
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
    rent: Number,
    addresses: [{
        type: {
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
        type: {
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
        ref: "Person"
    }
}, { versionKey: false });

personSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model("Person", personSchema);