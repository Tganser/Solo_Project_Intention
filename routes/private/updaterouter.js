var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//need to add my DB stuff to a model (intention DB and for events DB)
var Intentions = require('../../models/intentionModel');




router.post('/', function(req, res) {
  console.log('inside addProgress post');
  progressupdate = req.body.hours;
  console.log(progressupdate);
  thingid = req.body._id;
  newhours = req.body.hours - 1;
  console.log(thingid);


  Intentions.findOneAndUpdate({_id:thingid},{hours:newhours});

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
