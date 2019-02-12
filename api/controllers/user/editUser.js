const mongoose = require('mongoose');

const errorhandler = require('../../middlewares/errorhandler');
const User = require('../../models/user.model');

module.exports = (req, res, next) => {
    const id = req.params.id;

    const loggedInId = mongoose.Types.ObjectId(req.userData._id);
    const currentId = mongoose.Types.ObjectId(id);
    if (currentId.equals(loggedInId)) {
        User.findOne({
                _id: id
            })
            .exec()
            .then(result => {
                User.update({
                        _id: id
                    }, {
                        $set: {
                            name: req.body.name || result.name,
                            username: req.body.username || result.username,
                            avtar: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` || result.avtar
                        }
                    })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'User updated successfully',
                            body: result
                        })
                    })
                    .catch(err => errorhandler(err, res, 'Error while updating user.'))
            })
            .catch(err => errorhandler(err, res, 'Error while updating user.'))
    } else {
        const err = new Error('Unauthorized user');
        errorhandler(err, res, 'Unauthorized user request.')
    }

}