//this is the schema used to save calendar events to the database
//currently this schema is not being used in the app
//built for future iterations of Itention that allow for users to save events
//and goals and push them to their gcal

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
