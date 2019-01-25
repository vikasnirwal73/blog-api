const User = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const errorHandler = require('../../middlewares/errorhandler');

module.exports = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .exec()
        .then(doc => {
            if (doc == null) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        errorHandler(err, res);
                    }
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            errorHandler(err, res);
                        }
                        const newUser = new User({
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });

                        newUser.save(err => {
                            if (err) {
                                errorHandler(err, res);
                            }
                            res.status(201).json({
                                message: 'User created succesfully.'
                            })
                        })
                    })
                })
            } else {
                // const err = new Error('Not valid information.')
                errorHandler(err, res, 'Can\'t create user.');
            }
        })
        .catch(err => {
            errorHandler(err, res, 'Can\'t create user.');
        })
}
