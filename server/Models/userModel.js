import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
    about: { type: String, default: "" },
  },
  { timestamps: true },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
