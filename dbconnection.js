const mongoose = require('mongoose'); //ORM MongoDB

const db = mongoose.connection;

mongoose.connect('mongodb+srv://mongo:mongo@cluster0.ljs5s.mongodb.net/iotData?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to database!");
});

module.exports = db;