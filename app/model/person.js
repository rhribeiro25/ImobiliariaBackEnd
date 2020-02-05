var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    //type: {type: mongoose.Schema.Types.ObjectId, ref: "TypePerson"},
    firstName: String,
    lastName: String,
    birthday: Date,
    motherName: String,
    fatherName: String,
    //documents: [{type: mongoose.Schema.Types.ObjectId, ref: "Document"}],
    //addresses: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    //phoneNumbers: [{type: mongoose.Schema.Types.ObjectId, ref: "PhoneNumber"}]
}, { versionKey: false });

module.exports = mongoose.model("Person", personSchema);