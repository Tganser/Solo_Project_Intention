/**
 * Handles requests for Google calendar data.
 * @module private/calendar
 */
/**
 * GET /private/calendar
 *
 * @todo Get some data from the Google API. Call the API using the token
 * saved to the user.
 * @see {@link https://www.npmjs.com/package/google-calendar}
 * @see {@link https://developers.google.com/google-apps/calendar/v3/reference/#Calendars}
 *
 */

var express = require('express');
var router = express.Router();
var gcal = require('google-calendar');
var CalendarData = require('../../models/calendardatamodel');
var Users = require('../../models/user');

var allevents = [];
/**
* GET /private/calendar
*
* @todo Get some data from the Google API. Call the API using the token
* saved to the user.
* @see {@link https://www.npmjs.com/package/google-calendar}
* @see {@link https://developers.google.com/google-apps/calendar/v3/reference/#Calendars}
*
*/
router.get('/', function (req, res) {

  console.log("user access token:", req.user.googleToken);

  Users.remove({});
  var google_calendar = new gcal.GoogleCalendar(req.user.googleToken);

  google_calendar.calendarList.list(function(err, calendarList) {
    if(err){
      console.log("Error:", err);
    } else {
      // console.log("calendar list", calendarList);
      calendarId = calendarList.items[0].id;
      // console.log("first calendar id:", calendarId);
      google_calendar.events.list(calendarId, function(err, data) {
        // console.log("calendarID: ", calendarId);
        console.log("this is the data", data.items);
        events = data.items;

        // for (var i = 0; i < events.length; i++) {
        //             var event = events[i];
        //             var start = event.start.dateTime;
        //             var end = event.end.dateTime;
        //             var eventorganizer = event.organizer.email;
        //             var eventStatus = event.status;
        //             // console.log('%s - %s', start, event.summary); || event.start.date;;
        //             var eventSum = event.summary;
        //
        //             var eventObject = {
        //               name: eventSum,
        //               starttime: start,
        //               endtime: end,
        //               organizer: eventorganizer,
        //               status: eventStatus
        //             };
        //
        //             var newEvent = CalendarData(eventObject);
        //             newEvent.save().then( function(){
        //               // console.log("done")
        //             });
      //  }

      res.send(events);
    });
  }
});
});
//
// Date.prototype.getWeek = function(start) {
//  //Calculating the starting point
//  start = start || 0;
//  var today = new Date(this.setHours(0, 0, 0, 0));
//  var day = today.getDay() - start;
//  var date = today.getDate() - day;
//
//  // Grabbing Start/End Dates
//  var StartDate = new Date(today.setDate(date));
//  var EndDate = new Date(today.setDate(date + 6));
//  return [StartDate, EndDate];
// };

//
// var narrowDates = function(anarray){
//   console.log("in narrow dates funciton");
//   var Dates = new Date().getWeek(0);
//   console.log("dates[0]: ", Dates[0]);
//   console.log("dates[1]: ", Dates[1]);
//   for (var i = 0; i < anarray.length; i++) {
//     if (anarray[i].start.dateTime == Dates[0])
//     console.log(anarray[i]);
//   }
// };
//
// var addtoDB = function(anarray){
//   for (var i = 0; i < anarray.length; i++) {
//                     var event = anarray[i];
//                     var start = event.start.dateTime;
//                     var end = event.end.dateTime;
//                     var eventorganizer = event.organizer.email;
//                     var eventStatus = event.status;
//                     // console.log('%s - %s', start, event.summary); || event.start.date;;
//                     var eventSum = event.summary;
//
//                     var eventObject = {
//                       name: eventSum,
//                       starttime: start,
//                       endtime: end,
//                       organizer: eventorganizer,
//                       status: eventStatus
//                     };
//
//                     var newEvent = CalendarData(eventObject);
//                     newEvent.save().then( function(){
//                       console.log("done")
//                     });
//                     console.log(eventObject);
//                     // myEvents.push(eventAll);
//                 }
// });



module.exports = router;
