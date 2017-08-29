const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

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
    console.log(req.body);
});

module.exports = router;