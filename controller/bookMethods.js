const Book = require('../model/book');
const router = require('express').Router();

/*
  TODO: Add res.message to routes

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
  .post(function(req, res) {
    Book.create(req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  });

// Specific Book
router
  .route('/:id')
  .get(function(req, res) {
    Book.findById(req.params.id)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  })
  .put(function(req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBook => res.json({ message: 'Book updated!' }, dbBook))
      .catch(err => res.status(422).json(err));
  })
  .delete(function(req, res) {
    Book.findById(req.params.id)
      .then(dbBook => dbBook.remove())
      .then(dbBook => res.json({ message: 'Book deleted!' }, dbBook))
      .catch(err => res.status(422).json(err));
  });

module.exports = router;
