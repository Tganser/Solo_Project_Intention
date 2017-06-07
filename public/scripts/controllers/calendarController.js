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
        removeCancels(eventdata);
        removeAllDayEvents(eventdata);
        array1 = calculateDuration(eventdata);
        accumulateHours(array1);
        // buildViz(array1);


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
    // if (isNaN(eventObject)){
    //   console.log(eventObject.time, "is not a number - all day event?");
    // }
    // else {

    newArray.push(eventObject);
    // }
    // newArray.push(eventObject);
  }
  // console.log("newArray:", newArray);
  return newArray;
};


var accumulateHours = function(anarray) {

    console.log("testing begins:");


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
                console.log("match! do logic!");
                newObject.time += anarray[k].time;
                console.log(newObject.time);
            }
        }
        console.log(newObject);
        resultArray.push(newObject);
    }
    console.log("Final array: ", resultArray);
}
// console.log("Final array: ",resultArray);
// }

// var accumulateHours = function(anarray, aset){
//   console.log("in the function");
//   console.log(anarray);
//   console.log(aset);
//   var firstCategory = aset[0];
//   console.log(firstCategory);
//   if (anarray[i].name === firstCategory){
//     console.log("match!");
//     console.log(anarray[i].name, firstCategory);
//   }
// }
//
//
//
// accumulateHours(anarray, nameArray);




//
// //for each piece of name array, filter it!
//
// var accumulateHours = function(anarray, aset){
//   console.log("in accumulate Hours");
//   var newArray = [];
//   for (var i = 0; i < anarray.length; i++) {
//     console.log(anarray[i].name);
//     var work = anarray.filter(function(el){
//       return (el.name === "work");
//     });
//     // if (anarray[i].name === aset[0]){
//     //   console.log("time:", anarray[i].time);
//     // }
//   }
//   // if (anarray[i].name === aset[0]){
//   //   console.log("time:", anarray[i].time);
//   // }
//
//   // for (var i = 0; i < aset.length; i++) {
//   //   var word = aset[i];
//   //   console.log("word to start:" , word);
//   //   word = anarray.filter(function(el){
//   //     stringword = word.toString;
//   //     return (el.name === stringWord);
//   //   });
//   //   newArray.push(word);
//   // }
//   // console.log(newArray);
// };
//
// console.log(accumulateHours(anarray, nameArray));

// var work = anarray.filter(function(el){
//   return (el.name === "work");
// });
//
// console.log("filtered?", work);
//
// var accumulateHours = function(anarray, aset){
//   for (var i = 0; i < anarray.length; i++) {
//     if (anarray[i].name in aset[0]){
//       var text = anarray[i].name;
//       console.log(text);
//
//     }
//   }
// }

// accumuHours(anarray, nameArray);


// push anarray[0] to newArary

// loop through anarray check against newArray[0], if yes, accumulate hoursArray, if no
// var hoursArray = [];
// funfunctions(anarray, hoursArray);

// var funfunctions = function(anarray){
//   var hoursArray = [];
//   console.log("fun functions functioning");
//   hoursArray.push(anarray[0]);
//   // for (var j = 0; j < hoursArray.length; j++) {
//
//   for (var i = 0; i < anarray.length; i++) {
//     // var j;
//     // j = 0;
//     // for (var j = 0; j < hoursArray.length; i++) {
//       if (anarray[i].name === hoursArray[j].name) {
//         console.log("hoursarray time", hoursArray[j].time);
//         console.log("anarray time", anarray[i].time);
//         hoursArray[0].accumulatedTime = hoursArray[j].time + anarray[i].time;
//         console.log("total time:", hoursArray[j].accumulatedTime);
//         // j++;
//       }
//   }
// }
// console.log("final hours array:", hoursArray);
// // };
//
// funfunctions(anarray);

// hoursArray.push(anarray[0]);
// for (var i = 0; i < anarray.length; i++) {
//   if (anarray[i].name === hoursArray[0]) {
//     console.log("hoursarray time", hoursArray[0].time);
//     console.log("anarray time", anarray[i].time);
//     hoursArray[0].accumulatedTime = hoursArray[0].time + anarray[i].time;
//     console.log(hoursArray[0].accumulatedTime);
//   }
// }



// var accumulateHours = function(anarray){
//   var hoursArray = [{name:work, time: 4}];
//   hoursArray.push(anarray[0]);
//   console.log("hours array to start: ", hoursArray);
//   for (var i = 0; i < anarray.length; i++) {
//     for (var j=0; j<hoursArray.length; j++) {
//       if (anarray[i].name === hoursArray[j].name){
//         hoursArray[i].time
//
//     }
    // if (anarray[i].name === hoursArray[0].name){
      //accumulate hours
      // hoursArray.push(anarray[i]);
      //
    // }

    // if anarray[i].name = hoursArray[i].name
      // add time
    //else add name to array

//
//     if (anarray[i].name === hoursArray[0].name){
//       hoursArray[0].time += anarray.time;
//       console.log(hoursArray[0].name, hoursArray[0].time);
//     }
//     else {
//       hoursArray
//     }
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
