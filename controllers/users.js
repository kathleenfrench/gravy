const express = require('express');
const router = express.Router();

router 
.get('/sign-up', (req, res) => {
    res.send("Sign up!");
});

module.exports = router;