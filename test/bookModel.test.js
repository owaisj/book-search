const expect = require('chai').expect;
const Book = require('../model/book');

//TODO: Replicate for other inputs
describe('Book', function() {
  it('should be invalid without a title', function(done) {
    const tome = new Book();
    tome.validate(function(err) {
      expect(err.errors.title).to.exist;
      done(); //For async calls
    });
  });

  //TODO: Repeat for Image
  it("should return a validation error if the link isn't a URL", function(done) {
    //Invalid URL
    const tome = new Book({ link: 'google' });
    tome.validate(function(err) {
      expect(err.errors.link).to.exist;
      done();
    });
  });
});
