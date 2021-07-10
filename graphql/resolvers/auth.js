// Json Web Token
const jwt = require("jsonwebtoken");

// Bcrypt
const bcrypt = require("bcryptjs");

// Model
const User = require("../../models/user");

// JWT_Secret_Key
const { JWT_SecretKey } = process.env;

module.exports = {
  createUser: async (args) => {
    try {
      const { email, password } = args.userInput;
      const existingUser = await User.findOne({ email: email });
      if (!!existingUser) {
        throw new Error("User already exist");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });
      const userResult = await user.save();
      return { ...userResult._doc };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SecretKey,
        { expiresIn: "1h" }
      );
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (error) {
      throw error;
    }
  },
};
