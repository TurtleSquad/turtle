'use strict';

var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Message = require('../models/Message');
var Thread = require('../models/Thread');

function getMessages(threadName, callback) {
  Message.find({'threadName': threadName}, function(err, messages) {
    if (err) { callback(err); }
    callback(null, threadName, messages);
  });
}

module.exports = function (router) {
  router.use(eatAuth);
  router.use(bodyparser.json());

  //get all threads
  router.get('/threads', function(req, res) {
    Thread.find({'users': req.user.basic.username}, function(err, threads) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'internal server error'})
      }
      //loop over threads and get all messages for each
      for (var i=0; i<threads.length; i++) {
        getMessages(threads[i].threadName, function(err, threadName, messages) {
          if (err) {return afterGettingAllMessages(err);}
          var threadObj = {
            threadName: threadName,
            messages: []
          };
          for (var j=0; j<messages.length; j++) {
            var messageObj = {
              username: messages[j].authorName,
              message: messages[j].text,
              timeStamp: messages[j].timeStamp
            }
            threadObj.messages.push(messageObj);
          }
          afterGettingAllMessages(null, threadObj);
        });
      }
      var count = 0;
      var returnData = {threads: [], errors: [], success: true};
      if (!threads.length) {return res.json(returnData);}
      function afterGettingAllMessages(err, threadObj) {
        count++;
        if (err) {returnData.errors.push(err);}
        if (threadObj) {returnData.threads.push(threadObj);}
        if (count === threads.length) {
          res.json(returnData);
        }
      }
    });
  });

  //create new thread
  router.post('/threads', function(req, res) {
    //add logged in user to thread users list
    req.body.users.push(req.user.basic.username);

    //create and save new thread
    var newThread = new Thread(req.body);
    newThread.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'internal server error'})
      }
      res.json(data);
    });
  });

  //create new message
  router.post('/message', function(req, res) {
    var newMessage = new Message({
      threadName: req.body.threadName,
      authorName: req.user.basic.username,
      text: req.body.message
    });
    newMessage.save(function(err, message) {
      if(err) {
        console.log(err);
        return res.status(500).json({
          'success': false,
          'msg': 'Could not save message'
        });
      }
      res.json({
        'success': true,
        'msg': 'message saved',
        'message': message
      });
    });
  });
}
