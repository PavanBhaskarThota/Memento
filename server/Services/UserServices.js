import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserServices {
  async isUserNameTaken(userName) {
    try {
      const user = await UserModel.findOne({ name: userName });
      return user ? true : false;
    } catch (error) {
      throw new Error("Error checking username availability");
    }
  }

  async createUser(user) {
    try {
      const { email, password } = user;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return { message: "User already exists!" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ ...user, password: hashedPassword });

      await newUser.save();

      const token = jwt.sign(
        { user: newUser },
        process.env.JWT_SECRET || "pavan"
      );
      return { user: newUser, token };
    } catch (error) {
      return { error: error.message };
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const existingUser = await UserModel.findOne({ email: email });
      if (!existingUser) {
        return { message: "User does not exist!" };
      }
      const result = await bcrypt.compare(password, existingUser.password);
      if (result) {
        const user = {
          name: existingUser.name,
          _id: existingUser._id,
          profilePic: existingUser.profilePic,
        };
        const token = jwt.sign({ user }, "pavan");

        return { user, token };
      } else {
        return { message: "Password is incorrect!" };
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUserData(id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateUser(id, data) {
    try {
      const userData = { ...data };
      if (userData.userId && userData.userName) {
        delete userData.userId;
        delete userData.userName;
      }

      const user = await UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (user) return user;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new UserServices();
