import api from "../Api";

const PostService = {
  async getAllPosts() {
    return await api.get("/posts");
  },

  async createPost(post) {
    return await api.post("/posts/create", post);
  },

  async updatePost(id, post) {
    return await api.patch(`/posts/update/${id}`, post);
  },

  async deletePost(id) {
    return await api.delete(`/posts/delete/${id}`);
  },
};

export default PostService;
