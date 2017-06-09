googleAuthApp.controller('CalendarController', function ($http) {
  console.log('loaded CC');
  var _this = this;
  _this.data = '';
  var eventdata;
  var newArray = [];
  _this.today = today.substring(0,10);
  // _this.week = Dates;

  // $http.delete('/private/calendar')
  // .then(function (response){
  //   console.log("in the db users delete route");
  //   if (response.data.err){
  //     console.log(err);
  //   }
  //   else {
  //     console.log(response);
  //   }
  // });


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
        removeCancels(eventdata);
        removeAllDayEvents(eventdata);
        array1 = calculateDuration(eventdata);
        resultArray = accumulateHours(array1);
        buildViz(resultArray);


      }
    });

var removeCancels = function(anarray) {
    console.log("initial length: ", anarray.length);
    for (var i = 0; i < anarray.length; i++) {
        if (anarray[i].status === "cancelled") {
            anarray.splice(i, 1);
        }
        // console.log("total events: ", anarray.length);
        return anarray;
    }
};

var removeAllDayEvents = function(anarray) {
    // console.log("initial events: ", anarray.length);
    for (var i = 0; i < anarray.length; i++) {
        // if ('date' in anarray[i].start) {
        //     anarray.splice(anarray[i], 1);
        //     console.log("removed:", anarray[i]);
        // }
        // console.log(anarray[i].summary, anarray[i].transparency);

        if (anarray[i].transparency === "transparent"){
          anarray.splice(i, 1);
          // console.log("removed due to transparency:", anarray[i]);
        }
    }
    // console.log("getting rid of all day events: ", anarray.length);
    for (var i = 0; i < anarray.length; i++) {
      if ('date' in anarray[i].start){
        console.log("all day event?", anarray[i].start);
        anarray.splice(i, 1);
      }
    }
    // console.log(anarray);
    return anarray;
};

var calculateDuration = function(anarray){
  for (var i = 0; i < anarray.length; i++) {

    var event1 = anarray[i].summary;
    a = new Date(anarray[i].end.dateTime);
    b = new Date(anarray[i].start.dateTime);
    // console.log(a.getTime());
    var event1time = parseInt((a.getTime() - b.getTime())/3600000);
    // console.log(event1 + " "  + event1time);
    eventObject = {
      name: event1,
      time: event1time
    };
    newArray.push(eventObject);
  }
  return newArray;
};


var accumulateHours = function(anarray) {
    var nameArray = new Set();
    for (var i = 0; i < anarray.length; i++) {
        nameArray.add(anarray[i].name);
    }
    var resultArray = [];
    for (var j of nameArray) {
        console.log("this is the aset variable:", j);
        newObject = {
            name: j,
            time: 0
        }
        console.log("new Object at start:", newObject);
        for (var k = 0; k < anarray.length; k++) {
            console.log()
            if (anarray[k].name === j) {
                newObject.time += anarray[k].time;
                console.log(newObject.time);
            }
        }
        console.log(newObject);
        resultArray.push(newObject);
    }
    console.log("Final array: ", resultArray);
    return resultArray;
}


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
              { key: anarray[0].name,
                  y: anarray[0].time },
              { key: anarray[1].name,
                  y: anarray[1].time },
              { key: anarray[2].name,
                  y: anarray[2].time },
              { key: anarray[3].name,
                  y: anarray[3].time }
              // { key: anarray[4].name,
              //     y: anarray[4].time },
              // { key: anarray[5].name,
              //     y: anarray[5].time }
              // { key: newArray[6].name,
              //     y: newArray[6].time }
          ];
        }; //end buildViz
});

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
