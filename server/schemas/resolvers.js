const { User, Post } = require('../models');

const resolvers = {
  Query: {
    // user: async () => {
    //   return User.find({});
    // },
    // posts: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return Post.find(params);
    // },
    async getPosts(){
      try{
        const posts = await Post.find();
        return posts;
      }
      catch(err){
        throw new Error(err);
      }
    }
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
