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
        return response.data;
      });
    };

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

});
