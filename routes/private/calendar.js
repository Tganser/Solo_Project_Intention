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
// date functions
			Date.prototype.getWeek = function(start)	{
				start = start || 0;
				var today = new Date(this.setHours(0, 0, 0, 0));
				var day = today.getDay() - start;
				var date = today.getDate() - day;

				var StartDate = new Date(today.setDate(date));
				var EndDate = new Date(today.setDate(date + 6));
				return [StartDate, EndDate];
			};
			// set Dates to the start & end days of the week
			var Dates = new Date().getWeek();

// calculate today's date
			var today = new Date();
			today = today.toISOString();


router.get('/', function (req, res) {

  console.log("user access token:", req.user.googleToken);

  Users.remove({});
  var google_calendar = new gcal.GoogleCalendar(req.user.googleToken);
  var calendarId;

  var params = {
            timeMin: Dates[0].toISOString(),
            timeMax: Dates[1].toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: 'startTime'
  };

  // google_calendar.calendarList.list(function(err, calendarList) {
  //   if(err){
  //     console.log("Error:", err);
  //   } else {
  //     // console.log("calendar list", calendarList);
  //     calendarId = calendarList.items[0].id;
  //     // makeApiCall();
  //     console.log("first calendar id:", calendarId);
      google_calendar.events.list('primary', params, function(err, data) {
        // console.log("calendarID: ", calendarId);
        console.log("how many events? ", data.items.length);
        // console.log("this is the data", data.items);
        events = data.items;

      res.send(events);
    });
// });

function makeApiCall() {
				// gapi.client.load('calendar', 'v3', function() {				// load the calendar api (version 3)
					var request = google_calendar.events.list({
						'calendarId':	calendarId,	// calendar ID
						'maxResults':	20,									// show max of 20 events
						'singleEvents':	true,								// split recurring events into individual events
						'timeMin':		today,								// start showing events starting at today
						'timeMax':		Dates[1],							// end showing events this week (saturday)
						'orderBy':		'startTime'							// order events by their start time
					}).then(function(){
            console.log("request:", request);
          });


					// handle the response from our api call
					// request.execute(function(resp) {
					// 	for (var i = 0; i < resp.items.length; i++) {		// loop through events and write them out to a list
					// 		var li = document.createElement('li');
					// 		var eventInfo = resp.items[i].summary + ' ' +resp.items[i].start.dateTime;
					// 		li.appendChild(document.createTextNode(eventInfo));
					// 		document.getElementById('events').appendChild(li);
					// 	}
					// });
				// );
			}

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
