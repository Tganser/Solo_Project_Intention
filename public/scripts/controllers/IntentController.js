googleAuthApp.controller('IntentController', function(IntentionsService, $scope) {
  console.log('IntentController loaded');
  var vm = this;
  // vm.intentions = ["goal1", "goal2", "goal3", "goal4"];
  var newInput = vm.newInput;
  var hours = vm.hours;
  var progress = vm.progress


  // var user = session.user;

  console.log('hours:', hours);
  vm.myIntentions = [];

    vm.addIntention = function(newInput, hours, userthing){
      IntentionsService.addIntention(newInput, hours, userthing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data;
        createData(vm.myIntentions);
      });
    };

    vm.removeIntention = function(thing){
      IntentionsService.removeIntention(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data;
        createData(vm.myIntentions);
        });
    };

    vm.addProgress = function(thing){
      IntentionsService.addProgress(thing);
      IntentionsService.updateIntentions().then(function(data){
        vm.myIntentions = data;
        createData(vm.myIntentions);
        });
    };

    vm.updateIntention = function(){
      IntentionsService.updateIntentions().then(function(data){
        // console.log("data: ",data);
        vm.myIntentions = data;
        createData(vm.myIntentions);
        console.log("this is data: ", data);
      });
    };

    var buildProgressBar = function(anarray){
      console.log("in build progress bar");
    };

    var createData = function(anarray){

      for (var i = 0; i < anarray.length; i++) {


        anarray[i].options = {
            chart: {
                type: 'bulletChart',
                transitionDuration: 500
            }
        };

        anarray[i].data = {
            "title": "",
            // "subtitle": "US$, in thousands",
            "ranges": [0, 0, anarray[i].hours],
            "measures": [anarray[i].progress],
            "markers": [anarray[i].progress]
        };
      }
    };

  // vm.options = {
  //     chart: {
  //         type: 'bulletChart',
  //         transitionDuration: 500
  //     }
  // };
  //
  // vm.data = {
  //     "title": "Revenue",
  //     "subtitle": "US$, in thousands",
  //     "ranges": [vm.variable1, vm.variable2, vm.variable3],
  //     "measures": [vm.variable3],
  //     "markers": [vm.variable2]
  // };
});
