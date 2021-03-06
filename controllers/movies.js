const express = require('express');
const router = express.Router(); 
const axios = require('axios');
const models = require('../models');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const dotenv = require('dotenv').config()
const API_KEY = dotenv.parsed.MOVIE_API_KEY;

router
.get('/', (req, res) => {
    const popularMoviesURL = `http://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    axios.get(popularMoviesURL)
        .then((api_res) => {
            res.render('application', {
                locals: {
                    user: req.user,
                    movies: api_res.data
                },
                partials: {
                    yield: 'views/movies/index.html'
                }
            });
        })
    .catch((err) => {
        return console.log(err);
    });
})
.get('/movies/:id', csrfProtection, (req, res) => {
    const movieURL = `http://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`;

    axios.get(movieURL) 
        .then((api_res) => {
            models.Comment.findAll({
                where: { 
                  MovieId: req.params.id 
                }, 
                include: [
                    { 
                      model: models.User, 
                      attributes: ['id', 'username']
                    }
                ], 
                order: [
                  ['createdAt', 'DESC'],
                ],
            })
            .then((comments) => {
                res.render('application', {
                    locals: {
                        user: req.user, 
                        comments: comments,
                        movie: api_res.data, 
                        csrfToken: req.csrfToken()
                    }, 
                    partials: {
                        yield: 'views/movies/show.html'
                    }
                });
            })
        })
        .catch((err) => {
           return console.log(err);
        })
});

module.exports = router;