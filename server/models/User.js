const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      },
    ]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

module.exports = model('User', userSchema);
