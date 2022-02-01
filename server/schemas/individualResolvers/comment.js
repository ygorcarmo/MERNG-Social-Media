const { UserInputError } = require('apollo-server-express');
const { Post } = require('../../models');

module.exports = {
    Mutation: {
        createComment: async ( _, { postId, body }, context ) => {
           const { username } = checkAuth(context);
           
           if(body.trim() === '' || body === null)
            throw new UserInputError('Empty comment', { errors : {
               body: 'Comment body must not empty'}});

            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString() 
                });
                await post.save();

                return post;
            }
            else
                throw new UserInputError('Post not found :(')
        }
    }
};
