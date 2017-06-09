googleAuthApp.service('IntentionsService', function($http){

this.addIntention = function(thing, thing2, userthing){
  console.log("in add intention function!");
  console.log(thing);

  var intentionToSend = {
    user : userthing,
    name : thing,
    hours: thing2,
    progress: 0,
    dateadded : new Date(),
    starred: false
  };

  console.log(intentionToSend);

  return $http({
    method: 'POST',
    url : '/private/addIntentions',
    data: intentionToSend
  }).then(function(response){
    console.log("made it to the .then");
    return response;
  });
};

this.addProgress = function(thing){
  console.log("in add progress function");
  console.log("thing", thing);
  return $http({
    method: 'POST',
    url: '/private/addProgress',
    data: thing
  }).then(function(response){
    console.log(response);
    return response;
  });
};

this.removeIntention = function(thing){
  console.log("in remove Intention function!");
  console.log(thing._id);
  removeId = thing._id;
  return $http({
     method: 'DELETE',
     url: '/private/removeIntention',
     params: { id: removeId }
   }).then(function(response) {
     console.log(response);
     return response;
   });

};


this.updateIntentions = function(){
  console.log("in update intentions on service");
  return $http({
    method: 'GET',
    url: '/private/allIntentions'
  }).then(function(response){
    console.log("response from server in get intentions: ", response.data);
    return response.data;
  });
};


});
