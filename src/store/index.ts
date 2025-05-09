// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import  postReducer from './slices/postSlice';
import  userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
