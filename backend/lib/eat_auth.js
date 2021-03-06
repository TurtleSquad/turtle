'use strict';

var eat  = require('eat');
var User = require('../models/User.js');

module.exports = function(secret) {

  // Format for middleware; insert secret
  return function eatAuth(req, res, next) {
    var eatoken = req.headers.eat || req.body.eat || req.params.eat;
    if (!eatoken) {
      console.log('No eat provided.');
      return res.status(401).json({msg: 'please sign in to do that'});
    }

    eat.decode(eatoken, secret, function(err, decoded) {
      if (err) {
        console.log('EAT was not valid format. Error: ', err);
        return res.status(401).json({msg: 'please sign in to do that'});
      }

      User.findOne(decoded, function(err, user) {
        if (err || !user) {
          console.log('No user matches EAT. Error: ', err);
          return res.status(401).json({msg: 'please sign in to do that'});
        }

        req.user = user;  // user exists - attach for server use
        next();           // call next middleware
      });
    });
  };
};






