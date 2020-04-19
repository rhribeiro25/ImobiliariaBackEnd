var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: String,
    path: String,
}, { collection: 'images' }, { versionKey: false });

module.exports = mongoose.model("Image", imageSchema);