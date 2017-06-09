var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//need to add my DB stuff to a model (intention DB and for events DB)
var Intentions = require('../../models/intentionModel');




router.post('/', function(req, res) {
  console.log('inside addProgress post');
  console.log("this is the progress:", req.body.progress);
  var progressupdate = req.body.progress + 1;
  console.log("these are the hours: ", progressupdate);
  var thingid = req.body._id;
  console.log(req.body.id);
  var newhours = req.body.progress;
  console.log("which thing?", thingid);

  Intentions.findOneAndUpdate({_id:thingid},{progress:progressupdate}).then(function(data){
    console.log(data);
    res.send(200);
  });

  // newIntention.save(function(err) {
  //   console.log('new intention .save function');
  //   if(err){
  //     console.log(err);
  //     res.sendStatus(500);
  //   }else{
  //     console.log('successful intention created');
  //     res.sendStatus(201);
  //   }
  // });
});

module.exports = router;
