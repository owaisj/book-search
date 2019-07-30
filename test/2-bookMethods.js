process.env.NODE_ENV = 'test'; // This will also prevent morgan from running

const mongoose = require('mongoose');

// Model and Server
const Book = require('../model/book');
const server = require('../server');

// Assertions
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

// Test Objects
const validTome = {
  title: 'Arcthunder',
  authors: ['Robin'],
  description: 'Intermediate level tome',
  image: 'https://google.com',
  link: 'https://google.com',
  googleId: '0'
};

const invalidTome = {
  title: 'Arcthunder',
  authors: ['Robin'],
  description: 'Intermediate level tome'
};

chai.use(chaiHttp);
describe('Database access with controllers and routing', function() {
  // Set-up Test Database
  before(function(done) {
    mongoose.connect(
      'mongodb://localhost/bookSearchTestDb',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
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
        });
      done();
    });
  });

  // Add valid books to the db
  describe('/POST Book Route', function() {
    // it('should return an error with a missing field');
    it('should add a book with all required fields', function(done) {
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

  describe('/GET Book By ID', function() {
    it('should get a book by its id', function(done) {
      Book.create(validTome, function(err, book) {
        chai
          .request(server)
          .get(`/api/books/${book._id}`)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // ObjectId is a uuid
            // Must be converted to string for deep comparison
            res.body.should.have.property('_id').eql(book._id.toString());
          });
        done();
      });
    });
  });

  describe('/PUT Book Route', function() {
    it('should edit a book', function(done) {
      Book.create(validTome, function(err, book) {
        chai
          .request(server)
          .put(`/api/books/${book._id}`)
          .send({
            title: 'Arcfire',
            description: 'An intermediate fire tome.'
          })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Arcfire');
          });
        done();
      });
    });
  });

  describe('/DELETE Book Route', function() {
    it('should delete a book', function(done) {
      Book.create(validTome, function(err, book) {
        chai
          .request(server)
          .delete(`/api/books/${book._id}`)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book deleted!');
            done();
          });
      });
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
