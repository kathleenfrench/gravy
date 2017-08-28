const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (user) => {
        return jwt.sign({
            id: user.id, 
            email: user.email,
            username: user.username 
        }, 
        process.env.SECRET, 
            { expiresIn: "7d" });
    }
};