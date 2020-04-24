const mongoose = require('../../database');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    typeUser: {
        type: String,
        required: true,
        enum: ["USER", "ADMIN"]
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
    email: {
        type: String,
        unique: true
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
}, { versionKey: false });

userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model("User", userSchema);