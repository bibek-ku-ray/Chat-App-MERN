import express from "express"
import http from "http"
import {Server} from "socket.io"
import "dotenv/config";

const app = express()

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("Socket id: ", socket.id)
    const userId = socket.handshake.query.userId

    if (!userId) return
    
    userSocketMap[userId] = socket.id

    io.emit("onlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })

    
})

const getSocketId = (userId) => {
    return userSocketMap[userId]
}

export {io, app, httpServer, getSocketId}