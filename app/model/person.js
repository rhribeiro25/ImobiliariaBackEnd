var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var personSchema = new Schema({
    type: TypePerson,
    firstName: String,
    lastName: String,
    birthday: Date,
    motherName: String,
    fatherName: String,
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: "Document"}],
    addresses: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    phoneNumbers: [{type: mongoose.Schema.Types.ObjectId, ref: "PhoneNumber"}]
}, { versionKey: false });

mongoose.exports = mongoose.model("Person", personSchema);