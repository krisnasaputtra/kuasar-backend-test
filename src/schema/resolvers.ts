import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/models/user.model.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },

  Mutation: {
    signUp: async (parent, args, context) => {
      const { username, email, password } = args.input;

      try {
        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
          return {
            code: 400,
            success: false,
            message: "User already exist",
          };
        }

        const newPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: newPassword,
        });

        return {
          code: 200,
          success: true,
          message: "Successfull SignUn",
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
          }),
          user,
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error.message,
        };
      }
    },

    signIn: async (parent, args, context) => {
      const { email, password } = args.input;

      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return {
            code: 400,
            success: false,
            message: "User not found",
          };
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return {
            code: 400,
            success: false,
            message: "Wrong Email or Password",
          };
        }

        return {
          code: 200,
          success: true,
          message: "Successfull SignIn",
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
          }),
          user,
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error.message,
        };
      }
    },
  },
};
