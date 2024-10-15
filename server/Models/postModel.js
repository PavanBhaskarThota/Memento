import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    creator: { type: String, required: true },
    tags: { type: [String], required: false },
    photo: { type: String, required: false },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true },
  { versionKey: false }
);

const PostModel = mongoose.model("post", postSchema);

export default PostModel;
