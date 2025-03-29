import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
    socket: null,
    onlineUsers: null
}

console.log("Socket state: ", initialState)

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        initializeSocket: (state, action) => {
            console.log("initializeSocket");
            const socket = io(import.meta.env.VITE_BASE_URL_ORIGIN, {
                query: {
                    userId: action.payload,
                },
            });
            state.socket = socket;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        
    },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions; 
export default socketSlice.reducer