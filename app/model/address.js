var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    street: String,
    neighborhoods: String,
    city: String,
    number: String,
    cep: String,
    complement: String
}, { versionKey: false });

module.exports = mongoose.model("Address", addressSchema);