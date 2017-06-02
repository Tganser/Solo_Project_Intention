googleAuthApp.controller('WeekController', function($http) {
  console.log('WeekController loaded');
  var vm = this;

  vm.getcaldata = function(){
    console.log("in getcaldata");

      return $http({
        method: 'GET',
        url: '/getcalendardata'
      }).then(function(response){
        console.log("response from server in get caldata: ", response.data);
        cm.caldata = response.data;
        return response.data;
      });
    };

  vm.options = {
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

        vm.data = [
            {
                key: "Event1",
                y: vm.nameIn
            },
            {
                key: "Event2",
                y: 2.5
            },
            {
                key: "Event3",
                y: 6
            },
            {
                key: "Event4",
                y: 1
            },
            {
                key: "Event5",
                y: 1
            }
        ];
});

  // this.updateIntentions = function(){
  //   console.log("in update intentions on");
  //   return $http({
  //     method: 'GET',
  //     url: '/allIntentions'
  //   }).then(function(response){
  //     console.log("response from server in get intentions: ", response.data);
  //     return response.data;
  //   });
  // };

// });
