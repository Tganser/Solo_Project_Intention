/** ---------- REQUIRE NODE MODULES ---------- **/
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');
/** ---------- EXPRESS APP CONFIG ---------- **/
var app = express();
app.use('/public', express.static('public'));  // serve files from public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** ---------- DATABASE CONNECTION HANDLING ---------- **/
database();
/** ---------- SESSION CREATION AND STORAGE ---------- **/
/**
 * Creates session that will be stored in memory.
 * @todo Before deploying to production,
 * configure session store to save to DB instead of memory (default).
 * @see {@link https://www.npmjs.com/package/express-session}
 */
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));



/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);

/** ---------- SERVER START ---------- **/
app.listen(3000, function () {
  console.log('Now running on port ', 3000);
});
//
// var util = require('util');
// // var express  = require('express');
//
// // var config = require('./config');
// // var gcal = require('../GoogleCalendar');
// var gcal = require('google-calendar');
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
//
//
// /*
//   ===========================================================================
//             Setup express + passportjs server for authentication
//   ===========================================================================
// */
//
// // var app = express();
// // var passport = require('passport')
// // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
// // app.configure(function() {
//   // app.use(express.cookieParser());
//   // app.use(express.bodyParser());
//   // app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
// // });
// // app.listen(8082);
//
// passport.use(new GoogleStrategy({
//     clientID: configs.consumer_key,
//     clientSecret: configs.consumer_secret,
//     callbackURL: "http://localhost:8082/auth/callback",
//     scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     profile.accessToken = accessToken;
//     return done(null, profile);
//   }
// ));
//
// app.get('/auth',
//   passport.authenticate('google', { session: false }));
//
// app.get('/auth/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//   function(req, res) {
//     req.session.access_token = req.user.accessToken;
//     res.redirect('/');
//   });
//
//
// /*
//   ===========================================================================
//                                Google Calendar
//   ===========================================================================
// */
//
// app.all('/', function(req, res){
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
// app.all('/:calendarId', function(req, res){
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
//         console.log(data.items);
//       });
//     }
//
//
//     return res.send(data);
//   });
// });
//
//
// app.all('/:calendarId/:eventId', function(req, res){
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
//     return res.send(data);
//   });
// });
