const router = require('express').Router();
const bookMethods = require('./bookMethods');

router.use('/api/books', bookMethods);

module.exports = router;
