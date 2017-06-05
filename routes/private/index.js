/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var intentionRouter = require('./intentionsrouter');


/** ---------- SUBROUTES ---------- **/
router.use('/calendar', calendar);
router.use('/addIntentions', intentionRouter);
router.use('/allIntentions', intentionRouter);
router.use('/removeIntention', intentionRouter);
router.use('/updateIntention', intentionRouter);
router.use('/addProgress', intentionRouter);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});


module.exports = router;
