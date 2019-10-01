require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const User = require("../../models/User");

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../validation/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

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
      const { valid, errors } = validateRegisterInput(username, password);
      // register validation
      if (!valid) {
        throw new UserInputError("Register errors", { errors });
      }
      // check whether user exists or not
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("user already exists");
      }
      // hash password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Login errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "user not found";
        throw new UserInputError("user not found", { errors });
      }
      const validPwd = await bcrypt.compare(password, user.password);
      if (!validPwd) {
        errors.general = "wrong password";
        throw new UserInputError("wrong password", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
};
