const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/basicsocialnetworkDB', { // need to set DB name.......
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose.connection;
