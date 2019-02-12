const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');

module.exports = (req, res, next) => {
    const id = req.params.id;
    Post.findOne({
            _id: id
        }).exec()
        .then(doc => {
            const currentUserId = mongoose.Types.ObjectId(req.userData._id);
            const postUserId = mongoose.Types.ObjectId(doc.author);
            if (currentUserId.equals(postUserId)) {
                Post.update({
                        _id: id
                    }, {
                        $set: {
                            title: req.body.title || doc.title,
                            body: req.body.body || doc.body,
                            editDate: Date.now(),
                            featuredImage: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` || doc.featuredImage
                        }
                    }).exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Post modify sucessfully',
                            body: result
                        })
                    })
                    .catch(err => errorhandler(err, res, 'Error while modifing the post.'));
            } else {
                const err = new Error('Not authorized.')
                errorhandler(err, res, 'Can\'t update post.');
            }
        })
        .catch(err => errorhandler(err, res, 'Error while modifing the post.'));

}

