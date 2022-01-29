const postResolver = require("./individualResolvers/post");
const userResolver = require("./individualResolvers/user");

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

module.exports = resolvers;
