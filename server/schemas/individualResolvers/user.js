const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Post } = require("../../models");
const { UserInputError } = require("apollo-server-express");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "10h" }
  );
}

module.exports = {
  Query: {    
    user: async (parent, { username }) => {
      console.log(username)
      return User.findOne({ username }).populate('posts');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      console.log(params)
      return Post.find(params).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    // user login function
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) 
        throw new UserInputError("Error ", { errors });

      if (!user) {
        errors.general = "Invalid User and/or Password";
        throw new UserInputError("Invalid User and/or Password", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Invalid User and/or Password";
        throw new UserInputError("Invalid User and/or Password", { errors });
      }

      const token = generateToken(user);

      return {
        token,
        user
      };
    },

    // user register function
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) 
        throw new UserInputError("Errors", { errors });

      // Make sure user does not already exist
      let user = await User.findOne({ username });
      if (user)
        throw new UserInputError("Username already exists.", {
          errors: {
            username: "This username already exists.",
          },
        });
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      user = await newUser.save();

      const token = generateToken(user);

      return {
        token,
        user
      };
    },
  },
};
