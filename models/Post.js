const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date_created: {
        default: Date.now,
        type: Date,
    },
    date_posting: {
        type: Date,
    },
    caption: {
        required: true,
        type: String,
    },
    location: {
        type: Map,
        of: String
    },
    // location on server
    image: {
        required: true,
        type: String
    }
});

module.exports = Post = mongoose.model('post', PostSchema);