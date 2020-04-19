var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const phoneNumberSchema = new Schema({
    typePhone: String,
    ddd: String,
    phoneNumber: String
}, { collection: 'phoneNumbers' }, { versionKey: false });

module.exports = mongoose.model("PhoneNumber", phoneNumberSchema);