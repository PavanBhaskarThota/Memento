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
      return post;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updatePost(id, postData, user) {
    try {
      const postDetails = await PostModel.findById(id);
      if (user.userId === postDetails.userId) {
        const post = await PostModel.findByIdAndUpdate(id, postData, {
          new: true,
        });
        return post;
      }
      return { message: "Unauthorized" };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deletePost(id, user) {
    try {
      const postDetails = await PostModel.findById(id);
      if (user.userId === postDetails.userId) {
        const post = await PostModel.findByIdAndDelete(id, { new: true });
        return { post: post, message: "Post Deleted" };
      }
      return { message: "Unauthorized" };
    } catch (error) {
      return { error: error.message };
    }
  }
  async likePost(id, user) {
    try {
      const postDetails = await PostModel.findById(id);
      const like = postDetails.likeCount.find(
        (like) => like.userId === user.userId
      );

      if (like) {
        postDetails.likeCount = postDetails.likeCount.filter(
          (like) => like.userId !== user.userId
        );
      } else {
        postDetails.likeCount.push({
          userId: user.userId,
          userName: user.userName,
        });
      }
      const post = await PostModel.findByIdAndUpdate(
        id,
        { likeCount: postDetails.likeCount },
        { new: true, timestamps: false }
      );

      return post;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new PostServices();
