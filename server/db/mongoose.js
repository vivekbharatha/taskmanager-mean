const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/taskmanager';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to mongo db');
}).catch((err) => {
  console.log('Error on connecting to mongo', err);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};