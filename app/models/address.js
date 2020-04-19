var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
    typeAddress: String,
    street: String,
    neighborhoods: String,
    city: String,
    number: String,
    cep: String,
    complement: String,
    state: String
}, { versionKey: false });

module.exports = mongoose.model("Address", addressSchema);