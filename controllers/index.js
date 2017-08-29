const express = require('express');
const router = express.Router();

router
.use(require('./movies.js'))
.use(require('./users.js'))
.use(require('./comments.js'))
.use(require('./favorites.js'));

module.exports = router;