const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');

module.exports = (req, res, next) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.title,
        author: req.userData._id,
        dateCreated: Date.now()
    });
    newPost.save()
        .then(doc => {
            res.status(201).json({
                message: 'Post added.',
                more: doc
            })
        }).catch(err => {
            errorhandler(err, res, 'Error while creating post.');
        })
}