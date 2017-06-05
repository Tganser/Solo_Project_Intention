/**
 * Handles requests for Google calendar data.
 * @module private/calendar
 */
// var express = require('express');
//
// var router = express.Router();

/**
 * GET /private/calendar
 *
 * @todo Get some data from the Google API. Call the API using the token
 * saved to the user.
 * @see {@link https://www.npmjs.com/package/google-calendar}
 * @see {@link https://developers.google.com/google-apps/calendar/v3/reference/#Calendars}
 *
 */

 // */
var express = require('express');
var router = express.Router();
var gcal = require('google-calendar');
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

  var google_calendar = new gcal.GoogleCalendar(req.user.googleToken);

  google_calendar.calendarList.list(function(err, calendarList) {
    if(err){
      console.log("Error:", err);
    } else {
      console.log("calendar list", calendarList);
      calendarId = calendarList.items[0].id;
      console.log("first calendar id:", calendarId);
      google_calendar.events.list(calendarId, function(err, data) {
        console.log("calendarID: ", calendarId);
        console.log("this is the data", data.items);
       });
    }
  });

//this does the same thing as the one above.
  //   google_calendar.calendarList.list(function(err, data) {
  //   if(err) return res.send(500,err);
  //   console.log("in the new function");
  //   console.log(data);
  //   // return res.send(data);
  // });


// google_calendar.events.list(calendarId, {maxResults:10}, function(err, data) {
//     console.log("made it to events.list function");
//       if(err) {
//         console.log(err);
//       }
//
//       console.log(data);
//       // if(data.nextPageToken){
//       //   gcal(accessToken).events.list(calendarId, {maxResults:1, pageToken:data.nextPageToken}, function(err, data) {
//       //     console.log(data.items)
//       //   })
//     });

  //use the googleid to save information to a user and get it later!

//   function listEvents() {
//           // var calendar = google.calendar('v3');
//           var google_calendar = new gcal.GoogleCalendar(req.user.googleToken);
//
//           var Dates = new Date().getWeek();
//           var events = [];
//
//           google_calendar.events.list({
//               // auth: auth,
//               calendarId: 'primary',
//               timeMin: Dates[0].toISOString(),
//               timeMax: Dates[1].toISOString(),
//               maxResults: 50,
//               singleEvents: true,
//               orderBy: 'startTime'
//           }, function(err, response) {
//               if (err) {
//                   console.log('The API returned an error: ' + err);
//                   return;
//               }
//               events.push(response.items);
//               console.log(events);
//               // console.log(events);
//               if (events.length === 0) {
//                   console.log('No upcoming events found.');
//                   // res.sendStatus(500);
//               } else {
//                   console.log('Events this week:');
//                   // CalendarData.remove();
//                   // myEvents = [];
//                   for (var i = 0; i < events.length; i++) {
//                       var event = events[i];
//                       console.log(event);
//                       var start = event.start.dateTime;
//                       var end = event.end.dateTime;
//                       var eventorganizer = event.organizer.email;
//                       var eventStatus = event.status;
//                       // console.log('%s - %s', start, event.summary); || event.start.date;;
//                       var eventSum = event.summary;
//
//                       var eventObject = {
//                         name: eventSum,
//                         starttime: start,
//                         endtime: end,
//                         organizer: eventorganizer,
//                         status: eventStatus
//                       };
//
//                       var newEvent = CalendarData(eventObject);
//                       newEvent.save().then( function(){
//                         console.log("done");
//                       });
//                       // console.log(eventObject);
//                       // myEvents.push(eventAll);
//                   }
//
//                   res.send(events);
//                 }
// }


});





  // res.send({ message: 'hi' });
// });

module.exports = router;
//
//  var fs = require('fs');
//  var readline = require('readline');
//  var google = require('googleapis');
//  var googleAuth = require('google-auth-library');
//
// var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
//
//
// router.get('/', function(req, res) {
//     // Load client secrets from a local file.
//     fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//         if (err) {
//             console.log('Error loading client secret file: ' + err);
//             return;
//         }
//         // Authorize a client with the loaded credentials, then call the
//         // Google Calendar API.
//         authorize(JSON.parse(content), listEvents);
//     });
//
//     /**
//      * Create an OAuth2 client with the given credentials, and then execute the
//      * given callback function.
//      *
//      * @param {Object} credentials The authorization client credentials.
//      * @param {function} callback The callback to call with the authorized client.
//      */
//     function authorize(credentials, callback) {
//         var clientSecret = credentials.installed.client_secret;
//         var clientId = credentials.installed.client_id;
//         var redirectUrl = credentials.installed.redirect_uris[0];
//         var auth = new googleAuth();
//         var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
//
//         // Check if we have previously stored a token.
//         fs.readFile(TOKEN_PATH, function(err, token) {
//             if (err) {
//                 getNewToken(oauth2Client, callback);
//             } else {
//                 oauth2Client.credentials = JSON.parse(token);
//                 callback(oauth2Client);
//             }
//         });
//     }
//
//     /**
//      * Get and store new token after prompting for user authorization, and then
//      * execute the given callback with the authorized OAuth2 client.
//      *
//      * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//      * @param {getEventsCallback} callback The callback to call with the authorized
//      *     client.
//      */
//     function getNewToken(oauth2Client, callback) {
//         var authUrl = oauth2Client.generateAuthUrl({
//             access_type: 'offline',
//             scope: SCOPES
//         });
//         console.log('Authorize this app by visiting this url: ', authUrl);
//         var rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//         });
//         rl.question('Enter the code from that page here: ', function(code) {
//             rl.close();
//             oauth2Client.getToken(code, function(err, token) {
//                 if (err) {
//                     console.log('Error while trying to retrieve access token', err);
//                     return;
//                 }
//                 oauth2Client.credentials = token;
//                 storeToken(token);
//                 callback(oauth2Client);
//             });
//         });
//     }
//
//     /**
//      * Store token to disk be used in later program executions.
//      *
//      * @param {Object} token The token to store to disk.
//      */
//     function storeToken(token) {
//         try {
//             fs.mkdirSync(TOKEN_DIR);
//         } catch (err) {
//             if (err.code != 'EEXIST') {
//                 throw err;
//             }
//         }
//         fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//         console.log('Token stored to ' + TOKEN_PATH);
//     }
//
//     /**
//      * Lists the next 10 events on the user 's primary calendar. *
//      *
//      @param {
//          google.auth.OAuth2
//      }
//  auth An authorized OAuth2 client.*/
//
//  Date.prototype.getWeek = function(start) {
//      //Calcing the starting point
//      start = start || 0;
//      var today = new Date(this.setHours(0, 0, 0, 0));
//      var day = today.getDay() - start;
//      var date = today.getDate() - day;
//
//      // Grabbing Start/End Dates
//      var StartDate = new Date(today.setDate(date));
//      var EndDate = new Date(today.setDate(date + 6));
//      console.log("StartDate: ", StartDate);
//      console.log("EndDate: ", EndDate);
//      return [StartDate, EndDate];
//
//  };
//
//  // test code
//  // var Dates = new Date().getWeek();
//  // console.log(Dates);
//  // console.log(Dates[0].toLocaleDateString() + ' to ' + Dates[1].toLocaleDateString());
//
//     function listEvents(auth) {
//         var calendar = google.calendar('v3');
//         var Dates = new Date().getWeek();
//         var events = [];
//
//         calendar.events.list({
//             auth: auth,
//             calendarId: 'primary',
//             timeMin: Dates[0].toISOString(),
//             timeMax: Dates[1].toISOString(),
//             maxResults: 50,
//             singleEvents: true,
//             orderBy: 'startTime'
//         }, function(err, response) {
//             if (err) {
//                 console.log('The API returned an error: ' + err);
//                 return;
//             }
//             events.push(response.items);
//             console.log(events);
//             // console.log(events);
//             if (events.length === 0) {
//                 console.log('No upcoming events found.');
//                 // res.sendStatus(500);
//             } else {
//                 console.log('Events this week:');
//                 // CalendarData.remove();
//                 // myEvents = [];
//                 for (var i = 0; i < events.length; i++) {
//                     var event = events[i];
//                     console.log(event);
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
//                       console.log("done");
//                     });
//                     // console.log(eventObject);
//                     // myEvents.push(eventAll);
//                 }
//                 res.send(events);
//             }
//         });
//     }
//   });

 //	https://www.googleapis.com/auth/calendar
// var gcal = require('google-calendar');
// var passport = require('../../auth/passport');

// var accessToken = passport.token;
// console.log("this is the access token: ",accessToken);
//
//  var google_calendar = new gcal.GoogleCalendar(accessToken);
//
//  google_calendar.calendarList.list(function(err, calendarList) {
//    if (err) {
//      console.log(err);
//    }
//
//    console.log("made it to google_calendar.calendarList");
//    console.log(calendarList);
//
//   //  google_calendar.events.list(calendarId, function(err, calendarList) {
//   //    console.log("made it to google_calendar.events");
//   //  });
//  });

 // router.all('/', function(req, res){
 //
 //   if(!req.session.access_token) return res.redirect('/auth');
 //
 //   //Create an instance from accessToken
 //   var accessToken = req.session.access_token;
 //
 //   gcal(accessToken).calendarList.list(function(err, data) {
 //     if(err) return res.send(500,err);
 //     return res.send(data);
 //   });
 // });
 //
 // router.all('/:calendarId', function(req, res){
 //
 //   if(!req.session.access_token) return res.redirect('/auth');
 //
 //   //Create an instance from accessToken
 //   var accessToken     = req.session.access_token;
 //   var calendarId      = req.params.calendarId;
 //
 //   gcal(accessToken).events.list(calendarId, {maxResults:1}, function(err, data) {
 //     if(err) return res.send(500,err);
 //
 //     console.log(data);
 //     if(data.nextPageToken){
 //       gcal(accessToken).events.list(calendarId, {maxResults:1, pageToken:data.nextPageToken}, function(err, data) {
 //         console.log("data items: ",data.items);
 //       });
 //     }
 //
 //
 //     return res.send(data);
 //   });
 // });
 //
 //
 // router.all('/:calendarId/:eventId', function(req, res){
 //
 //   if(!req.session.access_token) return res.redirect('/auth');
 //
 //   //Create an instance from accessToken
 //   var accessToken     = req.session.access_token;
 //   var calendarId      = req.params.calendarId;
 //   var eventId         = req.params.eventId;
 //
 //   gcal(accessToken).events.get(calendarId, eventId, function(err, data) {
 //     if(err) return res.send(500,err);
 //     console.log("data from line 84:", data);
 //     return res.send(data);
 //   });
 // });

 // ANOTHER ATTEMPT:
//
//  function start() {
//    // 2. Initialize the JavaScript client library.
//    gapi.client.init({
//      'apiKey': 'YOUR_API_KEY',
//      // clientId and scope are optional if auth is not required.
//      'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
//      'scope': 'profile',
//    }).then(function() {
//      // 3. Initialize and make the API request.
//      return gapi.client.request({
//        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
//      })
//    }).then(function(response) {
//      console.log(response.result);
//    }, function(reason) {
//      console.log('Error: ' + reason.result.error.message);
//    });
//  };
//  // 1. Load the JavaScript client library.
//  gapi.load('client', start);
//
//
//  var gcal = require('google-calendar');
//  var passport = require('../../auth/passport');
//
// router.get('/', function (req, res) {
//
//   var accessToken = req.session.access_token;
//   console.log("accessToken: ", accessToken);
//   var google_calendar = new gcal.GoogleCalendar(accessToken);
//   var SCOPES = ['https://www.googleapis.com/auth/calendar'];
//
//   var calendarId = req.params.calendarId;
//
//   google_calendar.calendarList.list(function(err, calendarList) {
//     if (err){
//       console.log(err);
//     }
//
//     console.log("made it to google_calendar.calendarList");
//     console.log("this is the calendar list: ", calendarList);
//
//
//
//     google_calendar.events.list(calendarId, function(err, calendarList) {
//       if (err){
//         console.log(err);
//       }
//       console.log("made it to google_calendar.events");
//       console.log("calendarList: ", calendarList);
//     });
//   });
//
//   res.send({ message: 'hi' });
// });
//
