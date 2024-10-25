import api from "../Api";
import TokenService from "./tokenServices";

const setupInterceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken(); 
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const refreshToken = TokenService.getLocalRefreshToken();
          const { data } = await api.post("/auth/refresh-token", {
            refreshToken,
          });

          TokenService.updateLocalAccessToken(data.accessToken); 
          originalConfig.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`; 

          return api(originalConfig); 
        } catch (err) {
          TokenService.clearStorage(); 
          window.location.href = "/auth/login"; 
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
