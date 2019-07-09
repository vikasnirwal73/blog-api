const Post = require('../../models/post.model');
const errorhandler = require('../../middlewares/errorhandler');
module.exports = (req, res, next) => {

    const page = +req.query.page;
    const limit = +req.query.limit;
    console.log(page, limit);
    if ((typeof page == 'number' && typeof limit == 'number') && (page && limit) ) {
        Post.paginate({}, {
            page: page,
            limit: limit
        }, (err, result) => {
            if (err) {
                errorhandler(err, res);
            }


            res.status(200).json({
                result
            })
        })

    } else {
        Post.find().exec()
            .then(doc => {
                res.json({
                    posts: doc,
                    length: doc.length
                })
            })
            .catch(err => {
                errorhandler(err, res);
            })
    }

}