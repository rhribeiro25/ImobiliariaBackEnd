var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phoneNumberSchema = new Schema({
    street: String,
    neighborhoods: String,
    city: String,
    number: String,
    cep: String,
    complement: String
}, { versionKey: false });

module.exports = mongoose.model("PhoneNumber", phoneNumberSchema);