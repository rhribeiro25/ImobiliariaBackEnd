var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new Schema({
    people: [{type: mongoose.Schema.Types.ObjectId, ref: "Person"}],
    property: property,
    finishDate: Date,
    startDate: Date,
    rent: Number,
}, { versionKey: false });

module.exports = mongoose.model("Contract", contractSchema);