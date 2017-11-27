'use strict';
module.exports = function(app) {
  const notesRoutes = require('../controllers/notes');

  // notesRoutes
  app.route('/notes')
    .get(notesRoutes.list_all_notes)
    .post(notesRoutes.create_a_note);


  app.route('/notes/:noteId')
    .get(notesRoutes.read_a_note)
    .put(notesRoutes.update_a_note)
    .delete(notesRoutes.delete_a_note);
};