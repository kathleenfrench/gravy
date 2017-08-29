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
            res.redirect(`/movies/${req.params.movieId}`);
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        throw new Error("Unauthorized");
    }
})
.get('/comments/:id/edit', csrfProtection, (res, req) => {
    models.Comment.findById(req.params.id)
    .then((comment) => {
        res.render('application', {
            locals: {
                user: req.user, 
                comment: comment,
                csrfToken: req.csrfToken() 
            }, 
            partials: {
                yield: 'views/comments/edit.html'
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;