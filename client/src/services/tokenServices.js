class TokenService {
  getLocalAccessToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  getLocalRefreshToken() {
    return JSON.parse(localStorage.getItem("refreshToken"));
  }

  clearStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new TokenService();
