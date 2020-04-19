var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = new Schema({
    typeProp: String,
    address: {type: Schema.Types.ObjectId, ref: "Address"},
    valueLocation: Number,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}]
}, { versionKey: false });

module.exports = mongoose.model("Property", propertySchema);