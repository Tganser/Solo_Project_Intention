myApp.service('IntentionsService', function($http){

this.addIntention = function(thing, thing2){
  console.log("in add intention function!");
  console.log(thing);

  var intentionToSend = {
    name : thing,
    hours: thing2,
    dateadded : new Date(),
    starred: false
  };

  return $http({
    method: 'POST',
    url : '/addIntentions',
    data: intentionToSend
  }).then(function(response){
    console.log("made it to the .then");
    return response;
  });
};

this.removeIntention = function(thing){
  console.log("in remove Intention function!");
  console.log(thing._id);
  removeId = thing._id;
  return $http({
     method: 'DELETE',
     url: '/removeIntention',
     params: { id: removeId }
   }).then(function(response) {
     console.log(response);
     return response;
   });

};

this.starIntention = function(thing){
  console.log("in star intention function!");
  console.log(thing);
};

this.updateIntentions = function(){
  console.log("in update intentions on");
  return $http({
    method: 'GET',
    url: '/allIntentions'
  }).then(function(response){
    console.log("response from server in get intentions: ", response.data);
    return response.data;
  });
};


});
