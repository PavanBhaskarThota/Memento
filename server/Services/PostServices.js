import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

class PostServices {
  async getAllPosts({ page, limit = 5 }) {
    try {
      const posts = await PostModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createPost(postData) {
    try {
      const post = new PostModel(postData);
      const postDetails = await post.save({ new: true });
      console.log(postDetails);
      return postDetails;
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

  async getPostById(id) {
    try {
      const post = await PostModel.findById(id).lean();

      const likeCount = await Promise.all(
        post.likeCount.map(async (like) => {
          const user = await UserModel.findById({ _id: like.userId });
          if (user)
            return {
              userId: like.userId,
              userName: user.name,
              avatar: user.profilePic,
            };
        })
      );
      post.likeCount = likeCount;
      return post;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateComment(postId, { comment, commentId, reply }, user) {
    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      if (commentId) {
        const parentComment = post.comments.id(commentId);
        if (!parentComment) {
          throw new Error("Comment not found");
        }

        const newReply = {
          userId: user.userId,
          userName: user.userName,
          reply,
        };

        parentComment.replies.push(newReply);
      } else {
        const newComment = {
          userId: user.userId,
          userName: user.userName,
          comment,
          replies: [],
        };

        post.comments.unshift(newComment);
      }

      await post.save({ new: true, timestamps: false });

      return post;
    } catch (error) {
      console.error("Update comment error:", error.message);
      return { error: error.message };
    }
  }
}

export default new PostServices();
