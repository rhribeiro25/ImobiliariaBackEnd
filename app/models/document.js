var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const documentSchema = new Schema({
    typeDoc: String,
    digit: String,
    shippingDate: Date,
    dueDate: Date
}, { versionKey: false });

module.exports = mongoose.model("Document", documentSchema);