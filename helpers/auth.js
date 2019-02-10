const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const secret = dotenv.parsed.SECRET;

module.exports = {
    generateToken: (user) => {
        console.log('user.id: ', user.id, ' user.email: ', user.email, ' usernmae: ', user.username);
        return jwt.sign({
            id: user.id, 
            email: user.email,
            username: user.username 
        }, 
        secret, 
            { expiresIn: "7d" });
    },
    validateToken: (token) => {
        return jwt.verify(token, secret);
    }
};