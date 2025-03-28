import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
    "message/send",
    async ({ receiverId, message }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/message/send/${receiverId}`,
                {
                    message,
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.errMessage;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getMessageThunk = createAsyncThunk(
    "message/get",
    async ({ receiverId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/message/get/${receiverId}`
            );
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.errMessage;
            return rejectWithValue(errorMessage);
        }
    }
);
