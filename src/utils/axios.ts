'use client ';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // sends cookies
});



api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (example: 401), try refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        const res = await axios.post('http://localhost:8000/refrechToken', { token: refreshToken });

        const newAccessToken = res.data.accessToken;
        Cookies.set('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // logout or redirect if refresh fails
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


export default api;