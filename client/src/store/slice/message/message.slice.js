import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";
import toast from "react-hot-toast";

const initialState = {
    buttonLoading: false,
    screenLoading: false,
    messages: {messages: []}
}
export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setNewMessage : (state, action) => {
            console.log("message in slice", action.payload)
            if (Array.isArray(state.messages?.messages)) {
                state.messages.messages.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // send message
            .addCase(sendMessageThunk.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;

                // Ensure we have a proper structure to add messages to
                if (!state.messages) {
                    state.messages = { messages: [] };
                }

                // If messages array exists, add new message to it
                if (Array.isArray(state.messages.messages)) {
                    state.messages.messages.push(action.payload?.data);
                } else {
                    // Initialize messages array with the new message
                    state.messages.messages = [action.payload?.data];
                }
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.buttonLoading = false;
            })
            // get message
            .addCase(getMessageThunk.pending, (state, action) => {
                state.screenLoading = true;
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                state.messages = action.payload?.data || { messages: [] };
                state.screenLoading = false;
            })
            .addCase(getMessageThunk.rejected, (state, action) => {
                state.screenLoading = false;
            });
    },
});

export const { setNewMessage } = messageSlice.actions;
export default messageSlice.reducer