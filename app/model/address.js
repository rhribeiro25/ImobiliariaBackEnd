var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var addressSchema = new Schema({
    street: String,
    neighborhoods: String,
    city: String,
    number: String,
    cep: String,
    complement: String
}, { versionKey: false });

mongoose.exports = mongoose.model("Address", addressSchema);