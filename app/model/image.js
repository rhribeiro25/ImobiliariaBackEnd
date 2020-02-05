var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    name: String,
    path: String,
}, { versionKey: false });

module.exports = mongoose.model("Image", imageSchema);