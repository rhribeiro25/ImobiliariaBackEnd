import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/realEstate_v4', {useNewUrlParser: true, useUnifiedTopology: true, 
useCreateIndex: true, useFindAndModify: false});
mongoose.Promise = global.Promise;

export default mongoose;