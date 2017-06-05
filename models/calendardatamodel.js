var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var theSchema = mongoose.Schema({
  name: String,
  starttime: Date,
  endtime : Date,
  organizer: String,
  status: String
});

var eventscollection = mongoose.model('eventscollection', theSchema);


module.exports = eventscollection;
