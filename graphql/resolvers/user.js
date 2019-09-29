const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async register(_, { username, password }, context, info) {
        // check whether user exists or not 
        const user = await User.findOne({username})
        if(user){
            throw new Error('user already exists')
        }
        // hash password
        password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();

      return res;
    }
  }
};
