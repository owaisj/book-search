# Book Search App

A full-stack web application to view books from Google Books.

## Technologies

The back-end is a REST API with data using MongoDb with Mongoose and Node.js with Express.

## Database

This application uses MongoDb to store documents pertaining to the books. Mongoose is a library that is utilized to model the objects stored in the database.

To validate data that is posted in documents, the Validator.js library was used, primarily to check if urls added to documents are valid. The implementation of this was tested with Mocha.

## REST API

The REST controller for the books that are added to the database was written using Express JS on top of Node. They routes are tested using a database that is created and then toredown with Mocha and Mongoose.

## Testing
