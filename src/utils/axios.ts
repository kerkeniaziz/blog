'use client';

import axios from 'axios';
import { store } from '@/store'; // Import your Redux store
import {logout, setRefreshToken, setToken} from '@/store/slices/authSlice';
import {setUser} from "@/store/slices/userSlice"; // Import logout action

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important to include cookies
});

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token; // Get access token from Redux store
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

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token using the refresh token stored in HttpOnly cookie
                const refreshToken = store.getState().auth.refreshToken; // Get refresh token from Redux
                const res = await axios.post(
                    'http://localhost:8000/refreshToken',
                    { token: refreshToken },

                );

                const newAccessToken = res.data.accessToken;

                console.log(res.data);
                // Update access token in Redux
                //store.dispatch({ type: 'auth/setTokens', payload: { token: newAccessToken } });

                store.dispatch(setToken(newAccessToken));
                store.dispatch(setRefreshToken(refreshToken));


                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
               // store.dispatch(logout()); // Logout if refresh token fails
               // window.location.href = '/login'; // Redirect to login page
            }
        }

        return Promise.reject(error);
    }
);

export default api;
