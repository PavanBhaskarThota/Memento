import PostModel from "../Models/postModel.js";

export const getAllPosts = async () => {
  try {
    const posts = await PostModel.find();
    return posts;
  } catch (error) {
    return { error: error.message };
  }
};

export const createNewPost = async (postData) => {
  try {
    const post = new PostModel(postData);
    await post.save();
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

export const updatePostData = async (id, postData) => {
  try {
    const post = await PostModel.findByIdAndUpdate(id, postData);
    return post;
  } catch (error) {
    return { error: error.message };
  }
};

export const deletePostData = async (id) => {
  try {
    const post = await PostModel.findByIdAndDelete(id);
    return { post: post, status: "Post Deleted" };
  } catch (error) {
    return { error: error.message };
  }
};
