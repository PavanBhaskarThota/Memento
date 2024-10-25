import PostModel from "../Models/postModel.js";

class PostServices {
  async getAllPosts() {
    try {
      const posts = await PostModel.find();
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createPost(postData) {
    try {
      const post = new PostModel(postData);
      await post.save();
      console.log(post);
      return post;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updatePost(id, postData, user) {
    try {
      const postD = await PostModel.findById(id);
      if (user.userId === postD.userId) {
        const post = await PostModel.findByIdAndUpdate(id, postData);
        return post;
      }
      return { message: "Unauthorized" };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deletePost(id, user) {
    try {
      const postD = await PostModel.findById(id);
      if (user.userId === postD.userId) {
        const post = await PostModel.findByIdAndDelete(id);
        return { post: post, message: "Post Deleted" };
      }
      return { message: "Unauthorized" };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new PostServices();
