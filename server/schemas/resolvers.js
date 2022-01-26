const postResolver = require('./individualResolvers/post');
// const userResolver = require('./individualResolvers/user');

const resolvers = {
  Query: {
    ...postResolver.Query
  },
  // Mutation: {
  //   createUser: async (parent, args) => {
  //     const user = await User.create(args);
  //     return user;
  //   },
  //   createPost: async (parent, args) => {
  //     const post = await Post.create(args);
  //     return post;
  //   },
  //   // createVote: async (parent, { _id, techNum }) => {
  //   //   const vote = await Matchup.findOneAndUpdate(
  //   //     { _id },
  //   //     { $inc: { [`tech${techNum}_votes`]: 1 } },
  //   //     { new: true }
  //   //   );
  //   //   return vote;
  //   // },
  // },
};

module.exports = resolvers;
