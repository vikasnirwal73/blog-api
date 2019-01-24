const User = require('../../models/user.model');
const errorhandler = require('../../middlewares/errorhandler');
module.exports = (req, res, next) => {
    User.find().exec()
        .then(doc => {
            const users = doc.map(user => {
                return {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    posts: user.posts
                }
            })
            res.json({
                users
            })
        })
        .catch(err => {
            errorhandler(err, res);
        })
}