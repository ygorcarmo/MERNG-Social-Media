const userResolver = require("./individualResolvers/user");
const postResolver = require("./individualResolvers/post");
const commentResolver = require("./individualResolvers/comment");

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};

module.exports = resolvers;
