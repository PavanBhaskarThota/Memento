class TokenService {
  getLocalAccessToken() {
    const token = localStorage.getItem("token");
    console.log("Retrieved Token:", token); // Log token to debug
    return token; // No need for JSON.parse
  }

  updateLocalAccessToken(token) {
    console.log("Storing Token:", token); // Log token to debug
    localStorage.setItem("token", token); // Store token as plain string
  }

  getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Retrieved Refresh Token:", refreshToken); // Log token to debug
    return refreshToken; // No need for JSON.parse
  }

  clearStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new TokenService();
