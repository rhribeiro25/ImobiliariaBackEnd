var mongoose = require('mongoose');
var Schema = mongoose.Aggregate.Schema;

var imageSchema = new Schema({
    name: String,
    path: String,
}, { versionKey: false });

mongoose.exports = mongoose.model("Image", imageSchema);