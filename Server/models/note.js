'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var NoteSchema = new Schema({
  day: {
    type: String,
    default: moment().format('DD.MM.YYYY')
  },
  time: {
    type: String,
    default: moment().format('h:mm')
  },
  severity: {
    type: Number,
    default: null
  },
  duration: {
    type: Number,
    default: null
  },
  desc: {
    type: String,
    default: null
  },
  user: {
    type: ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);