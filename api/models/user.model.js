const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    username: {
        type: String,
        required: true
    },
    avtar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('User', userSchema);