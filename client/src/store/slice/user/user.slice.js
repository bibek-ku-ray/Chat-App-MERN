import { createSlice } from "@reduxjs/toolkit";
import {
    getAllUsersThunk,
    getUserProfileThunk,
    loginUserThunk,
    logoutUserThunk,
    registerUserThunk,
} from "./user.thunk";

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: true,
    allOtherUsers: null,
    selectedUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
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
                state.isAuthenticated = true;
                state.screenLoading = false;
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
                state.isAuthenticated = true;
                state.screenLoading = false;
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
                state.selectedUser = null
                state.allOtherUsers = null
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.buttonLoading = false;
            })
            // User Profile
            .addCase(getUserProfileThunk.pending, (state, action) => {
                state.screenLoading = true;
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action) => {
                state.screenLoading = false;
                state.userProfile = action.payload?.data;
                state.isAuthenticated = true;
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.screenLoading = false;
            })
            // get all other users
            .addCase(getAllUsersThunk.pending, (state, action) => {
                state.screenLoading = true;
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.screenLoading = false;
                state.allOtherUsers = action.payload?.data;
            })
            .addCase(getAllUsersThunk.rejected, (state, action) => {
                state.screenLoading = false;
            });
    },
});
export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
