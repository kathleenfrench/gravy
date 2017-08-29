const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const models = require('../models');

router 
.get('/movies/:movieId/comments/new', csrfProtection, (req, res) => {
    res.render('application', {
        locals: {
            user: req.user, 
            movieId: req.params.movieId,
            csrfToken: req.csrfToken()
        }, 
        partials: {
            yield: 'views/comments/new.html'
        }
    });
})
.post('/movies/:movieId/comments', csrfProtection, (req, res) => {
    if (req.user) {
        const newCommentData = {
            message: req.body.message,
            rating: parseInt(req.body.rating),
            UserId: req.user.id, 
            MovieId: req.params.movieId
        };
        models.Comment.create(newCommentData)
        .then((comment) => {
            res.redirect('/movies/${req.params.movieId}');
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        throw new Error("Unauthorized");
    }
});

module.exports = router;