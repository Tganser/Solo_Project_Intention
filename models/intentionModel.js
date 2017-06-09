var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var intentionSchema = new Schema({
  user: String,
  name : String,
  hours: Number,
  progress : Number,
  dateadded : Date,
  starred: Boolean,
});

var Intentions = mongoose.model('intentions', intentionSchema); // intentions is the collection name

module.exports = Intentions;
