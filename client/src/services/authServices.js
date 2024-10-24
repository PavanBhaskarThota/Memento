import api from "../Api";

const authServices = {
  async createUser(userData) {
    return await api.post("/user/create", userData);
  },
  async loginUser(userData) {
    return await api.post("/user/login", userData);
  },
  async isUserNameTaken(username) {
    return await api.get(`/user/isUserNameTaken/${username}`);
  },
  async getUserData(id) {
    return await api.get(`/user/${id}`);
  },
};

export default authServices;
