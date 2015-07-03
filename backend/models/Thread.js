'use strict';

var mongoose = require('mongoose');

var threadSchema = mongoose.Schema({
  threadName: { type: String, required: true },
  users: [String]
})

module.exports = mongoose.model('Thread', threadSchema);
