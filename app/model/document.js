var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    type: typeDocument,
    digit: String,
    shippingDate: Date,
    dueDate: Date
}, { versionKey: false });

module.exports = mongoose.model("Document", documentSchema);