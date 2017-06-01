console.log("client sourced");
var googleAuthApp = angular.module('theGoogles', ['ngRoute','nvd3']);

googleAuthApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    template: '',
    controller: 'LoginController as lc'
  }).when('/intentions', {
    templateUrl: 'views/intent.html',
    controller: 'IntentController as ic'
  }).when('/week', {
    templateUrl: 'views/viz.html',
    controller: 'WeekController as wc'
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as hc'
  }).when('/calendar', {
    templateUrl: '/public/views/templates/calendar.html',
    controller: 'CalendarController',
    controllerAs: 'calendar',
  })
  .when('/login', {
    templateUrl: '/public/views/templates/login.html',
    controller: 'AuthController',
    controllerAs: 'auth',
  })
  .otherwise({
    redirectTo: 'login',
  });

  $locationProvider.html5Mode(true);
});
