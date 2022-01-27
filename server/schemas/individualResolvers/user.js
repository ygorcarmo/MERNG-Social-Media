const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { UserInputError } = require('apollo-server-express')

module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }){
            // TODO: Validate user data
            // TODO: Make sure user does not already exist
            const user = await User.findOne({ username });
            if(user)
                throw new UserInputError('Username already exists.', { errors: {
                    username: 'This username already exists.'
                }})
            //hash password and create an auth token            
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, process.env.SECRET_KEY, { expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            };

        }
    }
};