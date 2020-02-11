var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    detail: PropertyDetail,
    address: Address,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}]
}, { versionKey: false });

module.exports = mongoose.model("Property", propertySchema);