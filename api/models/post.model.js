const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topics: [{ type: Schema.Types.ObjectId, ref:'Topic' }],
    dateCreated: {
        type: Date
    },
    editDate : {
        type: Date
    },
    featuredImage: String,
    categories: [ { type: Schema.Types.ObjectId, ref: 'Category' } ]
})

module.exports = mongoose.model('Post', postSchema);