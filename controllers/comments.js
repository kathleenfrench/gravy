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
.get('/comments/:id', csrfProtection, (res, req) => {
    models.Comment.findById(req.params.id)
    .then((comment) => {
        res.render('application', {
            locals: {
                user: req.user, 
                movieId: req.params.movieId,
                csrfToken: req.csrfToken(),                
                comment: comment
            }, 
            partials: {
                yield: 'views/comments/edit.html'
            }
        });
    })
    .catch((error) => {
        return console.log(error);
    });
})
.put('/comments/:id', csrfProtection, (req, res) => {
    models.Comment.findById(req.params.id)
    .then((comment) => {
        if (comment.UserId === req.user.id) {
            const updatedCommentData = {
                message: req.body.message,
                rating: parseInt(req.body.rating)
            };

            return comment.update(updatedCommentData)
            .then((updatedComment) => {
                res.redirect(`/movies/${comment.MovieId}`);
            })
            .catch((error) => {
                return console.log(error);
            });

        } else {
            throw new Error("Unauthorized");
        }
    })
    .catch((error) => {
        console.log(error);
    });
})
.delete('/comments/:id', csrfProtection, (req, res) => {
    models.Comment.findById(req.params.id)
    .then((comment) => {
        if (comment.UserId === req.user.id) {
            return comment.destroy() 
            .then((deletedComment) => {
                res.redirect(`/movies/${comment.MovieId}`);
            });
        } else {
            throw new Error("Unauthorized");
        }
    })
    .catch((error) => {
        return console.log(error);
    });
});

module.exports = router;