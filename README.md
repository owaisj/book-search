# Book Search App

A full-stack web application to view books from Google Books.

## Technologies

The back-end is a REST API with data using MongoDb with Mongoose and Node.js with Express.  
The routes and schema are tested with the Mocha test runner and Chai assertion library.

## Database

This application uses MongoDb to store documents pertaining to the books. Mongoose is a library that is utilized to model the objects stored in the database.

To validate data that is posted in documents, the Validator.js library was used, primarily to check added urls.

## REST API

The REST controller for the books that are added to the database was written using Express JS on top of Node. The GET (for all books) and POST routes run mongoose methods at the root of the API. Each book can be read, modified, and deleted by using a specific id.

## Testing

### Back-End

The chai assertion library was used as a way to write tests for the REST methods and schema. The chai-http plugin initialized the express server to test the routes.

For back-end testing two things were important:

1. Accurate use of validation functions.
2. REST performing their necessary actions
