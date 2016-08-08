var mongoose = require('mongoose');

var gifSchema = new mongoose.Schema({
  name: String,
  url: String
});

var Gif = mongoose.model('Gif', gifSchema);

// Make this available to our other files
module.exports = Gif;
