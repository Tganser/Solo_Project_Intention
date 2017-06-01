googleAuthApp.controller('IntentController', function(IntentionsService, $scope) {
  console.log('IntentController loaded');
  var vm = this;
  // vm.intentions = ["goal1", "goal2", "goal3", "goal4"];
  var newInput = vm.newInput;
  var hours = vm.hours;
  vm.myIntentions = [];

    vm.addIntention = function(newInput, hours){
      IntentionsService.addIntention(newInput);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data;});
    };

    vm.removeIntention = function(thing){
      IntentionsService.removeIntention(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data; });
    };

    vm.starIntention = function(thing){
      IntentionsService.starIntention(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data; });
    };

    vm.updateIntention = function(){
      IntentionsService.updateIntentions().then(function(data){
        // console.log("data: ",data);
        vm.myIntentions = data;
      });
    };

    vm.variable1 = 10;
    vm.variable2 = 20;
    vm.variable3 = 40;

  vm.options = {
      chart: {
          type: 'bulletChart',
          transitionDuration: 500
      }
  };

  vm.data = {
      "title": "Revenue",
      "subtitle": "US$, in thousands",
      "ranges": [vm.variable1, vm.variable2, vm.variable3],
      "measures": [vm.variable3],
      "markers": [vm.variable2]
  };
});
