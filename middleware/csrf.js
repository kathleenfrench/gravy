
module.exports = {
    checkCSRF: (err, req, res, next) => {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        res.status(403);
        res.send('Form Tampered With!');
    }
};