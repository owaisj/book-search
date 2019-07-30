const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const routes = require('./controller');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// common, short, tiny, dev arguments for morgan
// Disable while testing
if (process.env.NODE_ENV !== 'test') app.use(morgan('common'));

app.use(routes);
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/bookSearchDb';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'test') {
    console.log(`Test Server Initialized on port ${PORT}`);
  } else {
    console.log(`Server running: http://localhost:${PORT}`);
  }
});

// Export app for testing
module.exports = app;
