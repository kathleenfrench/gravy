const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcryptjs');
const auth = require('../helpers/auth.js');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const form = require('../helpers/form.js');

router 
.get('/sign-up', csrfProtection, (req, res) => {
    res.render('application', {
        locals: {
            user: req.user, 
            csrfToken: req.csrfToken(), 
            errors: {}
        },
        partials: {
            yield: 'views/users/sign-up.html'
        }
    });
})
.post('/sign-up', csrfProtection, (req, res) => {
    models.User.create(req.body, { fields: ['username', 'email', 'password'], individualHooks: true })
    .then((user) => {
        const token = auth.generateToken(user);
        res.cookie('gravy_token', token, { httpOnly: true, maxAge: 86400000 });
        res.redirect('/');
    }).catch((error) =>{
        res.status(422);
        const validationErrors = error.errors !== undefined ? 
            form.formErrors(error.errors) : {};
        return res.render('application', {
            locals: {
                user: req.user, 
                csrfToken: req.csrfToken(),
                errors: validationErrors
            },
            partials: {
                yield: 'views/users/sign-up.html'
            }
        });
    });
})
.get('/sign-out', csrfProtection, (req, res) => {
    res.clearCookie('gravy_token');
    res.redirect('/');
})
.get('/sign-in', csrfProtection, (req, res) => {
    res.render('application', {
        locals: {
            user: req.user,
            csrfToken: req.csrfToken(), 
            errors: null
        },
        partials: {
            yield: 'views/users/sign-in.html'
        }
    })
})
.post('/sign-in', csrfProtection, (req, res) => {
    models.User.findOne({ where: { email: req.body.email }})
    .then((user) => {
        if (!user) throw new Error("Email or Password is incorrect.");

        return bcrypt.compare(req.body.password, user.password)
        .then((match) => {
            if(match){
                const token = auth.generateToken(user);
                res.cookie('gravy_token', token, { httpOnly: true, maxAge: 86400000 });
                res.redirect('/');
            } else {
                throw new Error("Email or Password is incorrect.")
            }
        })
    })
    .catch((error) => {
        res.status(401);
        return res.render('application', {
            locals: {
                user: req.user, 
                csrfToken: req.csrfToken(), 
                errors: error.message
            },
            partials: {
                yield: 'views/users/sign-in.html'
            }
        })
    });
});

module.exports = router;