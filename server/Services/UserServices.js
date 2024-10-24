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
      const { name, email, password } = user;
      const existingUser = await UserModel.findOne({ email, name });

      if (existingUser) {
        return { message: "User already exists!" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ ...user, password: hashedPassword });

      await newUser.save();

      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || "pavan"
      );
      return { newUser, token };
    } catch (error) {
      return { error: error.message };
    }
  }

  // async loginUser(user) {
  //   try {
  //     const { email, password } = user;
  //     const existingUser = await UserModel.findOne({ email: email });
  //     if (existingUser) {
  //       console.log(existingUser)
  //       bcrypt.compare(password, existingUser.password, (err, result) => {
  //         if (result) {
  //           console.log(result)
  //           const token = jwt.sign(
  //             { email: user.email },
  //             process.env.JWT_SECRET || "pavan"
  //           );
  //           return { user: existingUser, token };
  //         } else {

  //           return { message: "Password is incorrect!" };
  //         }
  //       });
  //     } else {
  //       return { message: "User does not exist!" };
  //     }
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const existingUser = await UserModel.findOne({ email: email });
      const result = await bcrypt.compare(password, existingUser.password);
      if (result) {
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET || "pavan"
        );
        return { user: existingUser, token };
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
}

export default new UserServices();
