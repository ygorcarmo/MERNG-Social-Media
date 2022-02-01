const { Post } = require("../../models");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(parent, { body, title }, context) {
      const user = checkAuth(context);
      
      console.log(title);
      const newPost = await Post.create({
        body,
        title,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      // const post = await newPost.save();

      return newPost;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();

          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Access denied.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
