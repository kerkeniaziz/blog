import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setIsLoggedIn, setToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
