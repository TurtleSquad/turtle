'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// set environment var
process.env.PORT = process.env.PORT || 3000;
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev';

// connect mongoose
mongoose.connect(process.env.MONGOLAB_URI);

// init passport strat
app.use(passport.initialize());
require('./backend/lib/passport_strategy.js')(passport);

// routers
var userRouter = express.Router();
var messageRouter = express.Router();

// load routers
require('./backend/routes/user_routes.js')(userRouter, passport);
require('./backend/routes/message_routes.js')(messageRouter);

// assign base routes to routers
app.use('/api', userRouter);
app.use('/api', messageRouter);

// load static build/assets
app.use(express.static(__dirname + '/frontend'));

// start server
app.listen(process.env.PORT, function() {
  console.log('server running on port: ' + process.env.PORT );
});
