var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var phoneNumberSchema = new Schema({
    street: String,
    neighborhoods: String,
    city: String,
    number: String,
    cep: String,
    complement: String
}, { versionKey: false });

mongoose.exports = mongoose.model("PhoneNumber", phoneNumberSchema);