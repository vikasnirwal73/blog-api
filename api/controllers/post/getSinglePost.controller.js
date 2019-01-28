const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');
module.exports = (req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
    .populate('author', '-password')
    // .populate('topics')
    // .populate('categories')
    .exec()
    .then(post => {
        res.status(200).json({
            post: post
        })
    })
    .catch(err => errorhandler(err, res, 'Error while fetching the post.'))
}