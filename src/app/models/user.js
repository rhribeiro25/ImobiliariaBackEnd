const mongoose = require('../../database');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    typeVal: {
        type: String,
        required: true,
        enum: ["USER", "ADMIN"]
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
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
    birth: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        select: false
    },
    resetToken: {
        type: String,
        select: false
    },
    resetExpires: {
        type: String,
        select: false
    },
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
    crAt: {
        type: Date,
        default: Date.now
    },
    upAt: {
        type: Date,
    }
}, { versionKey: false });

userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
});

module.exports = mongoose.model("User", userSchema);