const express = require('express');
const router = express.Router();
const models = require('../models');

router 
.get('/sign-up', (req, res) => {
    res.render('application', {
        partials: {
            yield: 'views/users/sign-up.html'
        }
    });
})
.post('/sign-up', (req, res) => {
    models.User.create(req.body, { fields: ['username', 'email', 'password'] })
    .then((user) => {
        res.cookie('gravy_token', user.id, { httpOnly: true, maxAge: 86400000 });
        res.redirect('/');
    }).catch((error) =>{
        res.status(500);
    });
})
.get('/sign-out', (req, res) => {
    res.clearCookie('gravy_token');
    res.redirect('/');
});

module.exports = router;