import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserThunk = createAsyncThunk("users/login", async () => {
    console.log("Hello from thunk");
});
