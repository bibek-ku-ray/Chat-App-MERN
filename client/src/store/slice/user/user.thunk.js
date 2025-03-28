import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
    "users/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", {
                username,
                password,
            });
            toast.success("User logged in successfully", {
                style: {
                    color: "#fff",
                    background: "#09090b",
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.errMessage;
            toast.error(errorMessage, {
                style: {
                    color: "#fff",
                    background: "#09090b",
                },
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUserThunk = createAsyncThunk(
    "users/register",
    async ({ fullName, username, email, password, gender }, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/user/signup", {
                fullName,
                username,
                email,
                password,
                gender,
            });
            toast.success("User created successfully", {
                style: {
                    color: "#fff",
                    background: "#09090b",
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.errMessage;
            toast.error(errorMessage, {
                style: {
                    color: "#fff",
                    background: "#09090b",
                },
            });
            return rejectWithValue(errorMessage);
        }
    }
);

export const logoutUserThunk = createAsyncThunk("users/logout", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/user/logout");
        toast.success("User logged out successfully", {
            style: {
                color: "#fff",
                background: "#09090b",
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.errMessage;
        toast.error(errorMessage, {
            style: {
                color: "#fff",
                background: "#09090b",
            },
        });
        return registerUserThunk(errorMessage)
    }
});

export const getUserProfileThunk = createAsyncThunk("users/profile", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/user/get-profile");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.errMessage;
        return rejectWithValue(errorMessage);
    }
})

export const getAllUsersThunk = createAsyncThunk("users/allUsers", async (_, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get("/user/get-other-users");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.errMessage;
        return rejectWithValue(errorMessage);
    }
})
