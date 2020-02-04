var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var documentSchema = new Schema({
    type: typeDocument,
    digit: String,
    shippingDate: Date,
    dueDate: Date
}, { versionKey: false });

mongoose.exports = mongoose.model("Document", documentSchema);