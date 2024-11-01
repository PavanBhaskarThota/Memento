import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    reply: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    tags: { type: [String], required: false },
    photo: { type: String, required: false },
    likeCount: {
      type: [
        {
          userId: { type: String },
          userName: { type: String },
          _id: false,
        },
      ],
    },
    comments: [commentSchema],
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
