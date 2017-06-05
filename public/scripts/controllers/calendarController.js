googleAuthApp.controller('CalendarController', function ($http) {
  console.log('loaded CC');
  var _this = this;
  _this.data = '';
  var eventdata;
  var newArray = [];


  $http.get('/private/calendar')
    .then(function (response) {
      if (response.data.err) {
        _this.data = 'Sorry, you are not logged in!';
      } else {
        // _this.data = response.data;
        eventdata = response.data;
        console.log(response.data);
        console.log("eventdata: ", eventdata);
        // myevents = cleanup(eventdata);
        builddata(eventdata);
        buildViz(eventdata);
        // narrowDates(myevents);
      }
    });

var builddata = function(anarray){


  for (var i = 0; i < 6; i++) {
    var event1 = anarray[i].summary;
    a = new Date(anarray[i].end.dateTime);
    console.log(a);
    b = new Date(anarray[i].start.dateTime);
    console.log(a.getTime());
    var event1time = parseInt((a.getTime() - b.getTime())/3600000);
    console.log(event1 + " "  + event1time);
    eventObject = {
      name: event1,
      time: event1time
    };
    newArray.push(eventObject);
  }
  console.log(newArray);

};




  // for (var i = 0; i < anarray.length; i++) {
  //   if (anarray[1].summary === anarray[2].summary){
  //     anarray
  //   }
  // }


var buildViz = function(anarray){
  _this.options = {
              chart: {
                  type: 'pieChart',
                  height: 500,
                  x: function(d){return d.key;},
                  y: function(d){return d.y;},
                  showLabels: true,
                  duration: 500,
                  labelThreshold: 0.01,
                  labelSunbeamLayout: true,
                  legend: {
                      margin: {
                          top: 5,
                          right: 35,
                          bottom: 5,
                          left: 0
                      }
                  }
              }
          };

        _this.data = [
              { key: newArray[0].name,
                  y: newArray[0].time },
              { key: newArray[1].name,
                  y: newArray[1].time },
              { key: newArray[2].name,
                  y: newArray[2].time },
              { key: newArray[3].name,
                  y: newArray[3].time },
              { key: newArray[4].name,
                  y: newArray[4].time },
              { key: newArray[5].name,
                  y: newArray[5].time }
              // { key: newArray[6].name,
              //     y: newArray[6].time }
          ];
        }; //end buildViz


// var cleanup = function(anarray){
//   var newArray = [];
//   for (var i = 0; i < anarray.length; i++) {
//     if (anarray[i].status === "cancelled"){
//       console.log(anarray[i].summary + "is cancelled");
//     }
//     else {
//       newArray.push(anarray[i]);
//     }
//   }
//   console.log(newArray);
//   return newArray;
// };

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

// var narrowDates = function(anarray){
//   console.log("in narrow dates funciton");
//   var Dates = new Date().getWeek(0);
//   console.log("dates[0]: ", Dates[0]);
//   console.log("dates[1]: ", Dates[1]);
//   for (var i = 0; i < anarray.length; i++) {
//     eventdate = anarray[i].start.dateTime;
//     console.log(anarray[i].summary + " " + eventdate);
//     // if (eventdate >= Dates[0] && anarray[i] <= Dates[1]){
//     //   console.log("event: ", eventdate);
//     //   console.log("week start: ", Dates[0]);
//     //   console.log("week end: ", Dates[1]);
//     // }
//   }
//
//     // console.log(anarray[i]);
//   };
});


// return startD >= startdate && endD <= enddate;
