import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

const initialState = {
    isAuthenticated: false,
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
        builder
            .addCase(loginUserThunk.fulfilled, (state, action) => {console.log("fulfilled 👍")})
            .addCase(loginUserThunk.pending, (state, action) => {console.log("pending 🫸")})
            .addCase(loginUserThunk.rejected, (state, action) => {console.log("rejected 👎")});
    },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
