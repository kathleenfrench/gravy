const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const models = require('../models');

router 
.get('/favorites', csrfProtection, (req, res) => {
    models.Favorite.findAll({
        where: { UserId: req.user.id }, 
        /* include: [{ 
            model: models.Favorite, 
            attributes: ['id', 'title', 'overview', 'post_path' ]
        }], */
        order: '"createdAt" DESC'
    })
    .then((favorites) => {
        return res.render('application', {
            locals: {
                user: req.user, 
                favorites: favorites,
                csrfToken: req.csrfToken()
            }, 
            partials: {
                yield: 'views/favorites/index.html'
            }
        })
    })
    .catch((err) => {
        return console.log(err);
    })
})
.post('/movies/${movie.id}/favorites', csrfProtection, (req, res) => {   //:id option ?  
    if (req.user) {
        
        models.Favorite.findOrCreate({ where: // or findOrCreate?/findOne
            { 
                UserId: req.user.id, 
                MovieId: req.params.movieId 
            }
        })
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
                return res.redirect(`/movies/${req.params.movieId}`);
            });
        })
        .catch((error) => {
            res.status(422);
            res.redirect(`/movies/${req.params.movieId}`);
        });
    } else {
        throw new Error("Unauthorized");
    }
})
.delete('/favorites/:id', csrfProtection, (req, res) => {
    models.Favorite.findById(req.params.id)
    .then((favorite) => {
        if (favorite.UserId === req.favorite.id) {
            return favorite.destroy() 
            .then((deletedFavorite) => {
                return res.redirect(`/movies/${comment.MovieId}`);
            });
        } else {
            throw new Error("Unauthorized");
        }
    })
    .catch((error) => {
        return console.log(error);
    })
});

module.exports = router;