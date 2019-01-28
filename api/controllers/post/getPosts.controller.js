const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');
module.exports = (req, res, next) => {
    Post.find().exec()
        .then(doc => {
            res.json({
                posts : doc,
                length: doc.length
            })
        })
        .catch(err => {
            errorhandler(err, res);
        })
}