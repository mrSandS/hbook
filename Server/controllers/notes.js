'use strict';

const mongoose = require('mongoose');
const Note = mongoose.model('Note');

exports.list_all_notes = function(req, res) {
  console.log('User: ', req.user._id)
  Note.find({user: req.user._id}, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};




exports.create_a_note = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var noteData = Object.assign({}, req.body, {user: req.user._id});
  var new_note = new Note(noteData);

  new_note
  .save(function(err, note) {
    if (err) {
      res.send(err);
    }        
  })
  .then((data) => {
    console.log('DAY: ', data.day)
    res.json(data)   
  });
};


exports.read_a_note = function(req, res) {
  Note.findById(req.params.noteId, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};


exports.update_a_note = function(req, res) {
  Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true}, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};


exports.delete_a_note = function(req, res) {
  console.log('ID: ', req.params.noteId)
  Note.remove({
    _id: req.params.noteId
  }, function(err, note) {
    if (err)
      res.send(err);
    res.json({ success: true });
  });
};
