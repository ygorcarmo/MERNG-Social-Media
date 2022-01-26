const { User } = require('../../models');

module.exports = {
    Mutation: {
        register(_, args, context, info){
            // TODO: Validate user data
            // TODO: Make sure user does not already exist
            // TODO: hash password and create an auth token
            
        }
    }
};