const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imobiliaria', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;