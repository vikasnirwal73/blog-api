const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');


module.exports = (req, res, next) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.userData._id,
        dateCreated: Date.now(),
        featuredImage: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
    });
    newPost
        .save()
        .then(doc => {
            res.status(201).json({
                message: 'Post added.',
                post: doc
            })
        }).catch(err => {
            errorhandler(err, res, 'Error while creating post.');
        })

}