const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: value => validator.isURL(value)
  },
  link: {
    type: String,
    required: true,
    validate: value => validator.isURL(value)
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
