const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const models = require('../models');

router 
.post('/favorites', csrfProtection, (req, res) => {
    if (req.user) {
        models.Favorite.findOne({ where: { UserId: req.user.id, MovieId: req.params.movieId }})
        .then((favorite) => {
            if(favorite) throw new Error("Favorite exists.");

            const newFavoriteData = {
                title: req.body.title, 
                overview: req.body.overview, 
                post_path: req.body.post_path, 
                UserId: req.user.id, 
                MovieId: req.params.movieId
            };

            models.Favorite.create(newFavoriteData)
            .then((favorite) => {
                res.redirect(`/movies/${req.params.movieId}`);
            });
        })
        .catch((error) => {
            res.status(422);
            res.redirect(`/movies/${req.params.movieId}`);
        });
    } else {
        throw new Error("Unauthorized");
    }
});

module.exports = router;