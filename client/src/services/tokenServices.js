class TokenService {
  getLocalAccessToken() {
    const token = localStorage.getItem("token");
    return token; // No need for JSON.parse
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("token", token); // Store token as plain string
  }

  getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken; // No need for JSON.parse
  }

  clearStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new TokenService();
