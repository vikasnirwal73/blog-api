const User = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const errorHandler = require('../../middlewares/errorhandler');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    User.findOne({
            email: req.body.email
        }).exec()
        .then(doc => {
            bcrypt.compare(req.body.password, doc.password, (err, result) => {
                if (result) {
                    const payload = {
                        email: doc.email,
                        _id: doc._id
                    }
                    jwt.sign(payload,
                        process.env.SECRET, {
                            expiresIn: '2 days'
                        },
                        (err, token) => {
                            if (err) {
                                errorHandler(err, res);
                            } else {
                                res.status(200).json({
                                    message: 'Login sucessful',
                                    token: token,
                                    email: doc.email,
                                    name:doc.name,
                                    username:doc.username,
                                    avtar:doc.avtar ? doc.avtar : null,
                                    _id: doc._id
                                })
                            }
                        })


                } else {
                    const err = new Error('Unauthorized');
                    err.status = 401;
                    errorHandler(err, res, 'Unauthorized user');
                }
            })
        })
        .catch(err => {
            errorHandler(err, res, 'Login failed.')
        })
}