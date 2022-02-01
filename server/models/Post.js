const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    username: String,
    createdAt: String,
    comments: [{
        body: String,
        username: String,
        createdAt: String
    }],
    likes: [{
        username: String,
        createdAt: String
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);
