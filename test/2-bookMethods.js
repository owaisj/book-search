process.env.NODE_ENV = 'test'; // This will also prevent morgan from running

const mongoose = require('mongoose');

// Model and Server
const Book = require('../model/book');
const server = require('../server');

// Assertions
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('Database access with controllers and routing', function() {
  // Set-up Test Database
  before(function(done) {
    mongoose.connect(
      'mongodb://localhost/bookSearchTestDb',
      {
        useNewUrlParser: true,
        useCreateIndex: true
      },
      // Drop test db if it exists
      function() {
        mongoose.connection.db.dropDatabase();
      }
    );
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
          res.body.length.should.be.eql(0);
        });
      done();
    });
  });

  // Add valid books to the db
  describe('/POST Book Route', function() {
    // it('should return an error with a missing field');
    it('should add a book with all required fields', function(done) {
      const validTome = {
        title: 'Arcthunder',
        authors: ['Robin'],
        description: 'Intermediate level tome',
        image: 'https://google.com',
        link: 'https://google.com',
        googleId: '0'
      };

      chai
        .request(server)
        .post('/api/books')
        .send(validTome)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });

    it('should return an error if a field is missing', function(done) {
      const invalidTome = {
        title: 'Arcthunder',
        authors: ['Robin'],
        description: 'Intermediate level tome'
      };
      chai
        .request(server)
        .post('/api/books')
        .send(invalidTome)
        .end(function(err, res) {
          res.should.have.status(422);
        });
      done();
    });
  });

  // Teardown test database
  after(function(done) {
    mongoose.connect(
      'mongodb://localhost/bookSearchTestDb',
      { useNewUrlParser: true },
      function() {
        mongoose.connection.db.dropDatabase(function() {
          mongoose.connection.close();
          done();
        });
      }
    );
  });
});
