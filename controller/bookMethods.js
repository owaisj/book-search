const Book = require('../model/book');
const router = require('express').Router();

/*
  Create/POST - create
  Read/GET - find, findById
  UPDATE - findOneAndUpdate
  Delete - findById (with remove method)
  ------------------------------------------------------------
  api/books and api/books/:id
  These are queries that will be used for routes.
  router.route() allows multiple methods for the same endpoint
*/

// All Books/POST
router
  .route('/')
  .get(function(req, res) {
    Book.find({})
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  })
  .post();

// Specific Book
router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
