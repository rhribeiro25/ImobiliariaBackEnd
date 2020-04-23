var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new Schema({
    startDate: Date,
    finishDate: Date,
    people: [{
        type: Schema.Types.ObjectId, 
        ref: "Person",
    }],
    property: {
        type: Schema.Types.ObjectId, 
        ref: "Property",
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "Person"
    }
}, { versionKey: false });

module.exports = mongoose.model("Contract", contractSchema);