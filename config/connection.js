const mongoose = require('mongoose');
// connect to MongoDB database using mongoose
mongoose.connect('mongodb://localhost:27017/basicsocialnetworkDB', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose.connection;
