var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var propertySchema = new Schema({
    detail: PropertyDetail,
    address: Address,
    valueLocation: Number,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}]
}, { versionKey: false });

mongoose.exports = mongoose.model("Property", propertySchema);