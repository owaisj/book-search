process.env.NODE_ENV = 'test'; // This will also prevent morgan from running

const mongoose = require('mongoose');

// Model and Server
const Book = require('../model/book');
const server = require('../server');

// Assertions
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

// Get one book (later)

// Update book

// Delete book

chai.use(chaiHttp);
describe('Database access with controllers and routing', function() {
  // Set-up Test Database
  before(function(done) {
    mongoose.connect('mongodb://localhost/bookSearchTestDb', {
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', function(err) {
      if (err) {
        db.close();
        console.log(
          'Unable to connect to the database. Test runner shutting down.'
        );
        done();
      }
    });
    db.once('open', function() {
      console.log('Connection to test database established.');
      done();
    });
  });

  // Get all books
  describe('/GET Books Route', function() {
    it('should return all the books', function(done) {
      chai
        .request(server)
        .get('/api/books')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0); // Empty library
        });
      done();
    });
  });

  describe('/POST Book Route', function() {
    it('should return an error with a missing field');
    it('should add a book with all required fields');
  });

  // Teardown test database
  after(function(done) {
    mongoose.connect(
      'mongodb://localhost/bookSearchTestDb',
      { useNewUrlParser: true },
      function() {
        mongoose.connection.db.dropDatabase(function() {
          mongoose.connection.close();
        });
      }
    );
    done();
  });
});
