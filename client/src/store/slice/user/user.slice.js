import { createSlice } from "@reduxjs/toolkit";
import {
    loginUserThunk,
    logoutUserThunk,
    registerUserThunk,
} from "./user.thunk";

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: () => {
            console.log("Login action");
        },
    },
    extraReducers: (builder) => {
        // User Login
        builder
            .addCase(loginUserThunk.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.userProfile = action.payload?.data;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.buttonLoading = false;
            })
            // User Register
            .addCase(registerUserThunk.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.userProfile = action.payload?.data;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.buttonLoading = false;
            })
            // User Logout
            .addCase(logoutUserThunk.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.userProfile = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.buttonLoading = false;
            });
    },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
