const userResolver = require("./individualResolvers/user");
const postResolver = require("./individualResolvers/post");
const commentResolver = require("./individualResolvers/comment");

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation 
  },
  Subscription: {
    ...postResolver.Subscription
  }
};

module.exports = resolvers;
