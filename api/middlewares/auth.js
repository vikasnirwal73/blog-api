const jwt = require('jsonwebtoken');
const errorhandler = require('./errorhandler');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            errorhandler(err, res, 'Unauthorized user.');
        } else {
            req.userData = decoded;
            next();
        }
    })
}