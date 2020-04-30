var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new Schema({
    started: Date,
    finished: Date,
    people: [{
        type: Schema.Types.ObjectId, 
        ref: "Person",
    }],
    property: {
        type: Schema.Types.ObjectId, 
        ref: "Property",
    },
    crBy: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    crAt: {
        type: Date,
        default: Date.now
    },
    upAt: {
        type: Date,
    }
}, { versionKey: false });

module.exports = mongoose.model("Contract", contractSchema);