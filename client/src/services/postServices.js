import api from "../Api";

const PostService = {
  async getAllPosts(page,limit=2) {
    return await api.get(`/posts?page=${page}&limit=${limit}`);
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
  async likePost(id) {
    return await api.patch(`/posts/likePost/${id}`);
  },
  async getPostById(id) {
    return await api.get(`/posts/singlePost/${id}`);
  },
  async updateComment(id,data) {
    return await api.patch(`/posts/updateComment/${id}`,data);
  },
};

export default PostService;
