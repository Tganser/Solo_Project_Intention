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
      google_calendar.events.list('primary', params, function(err, data) {
        // console.log("how many events? ", data.items.length);
        // console.log("this is the data", data.items);
        events = data.items;

      res.send(events);
    });

});


//this will be the route to add an intention goal to the calendar

// router.post('/', function(req, res){
//   let event = {
//     'start': { 'dateTime': '2017-05-20T07:00:00+08:00' },
//     'end': { 'dateTime': '2017-05-20T08:00:00+08:00' },
//     'location': 'Coffeeshop',
//     'summary': 'Breakfast',
//     'status': 'confirmed',
//     'description': '',
//     'colorId': 1
// };
//
// cal.Events.insert(calendarId, event)
//   .then(resp => {
//     console.log('inserted event:');
//     console.log(resp);
//   })
//   .catch(err => {
//     console.log('Error: insertEvent-' + err);
//   });
// });


module.exports = router;
