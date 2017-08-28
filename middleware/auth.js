const auth = require('../helpers/auth.js');

module.exports = {
    checkCookie: (req, res, next) => {
        const gravyJWT = req.cookies.gravy_token;
        if (gravyJWT) {
            const tokenData = auth.validateToken(gravyJWT);
            if (tokenData) {
                req.user = { id: tokenData.id, username: tokenData.username, email: tokenData.email };
                next();
            } else {
                res.clearCookie('gravy_token');
                res.redirect('/sign-in');
                req.user = null;
                next();
            }
        } else {
            req.user = null; 
            next();
        }
    }
}