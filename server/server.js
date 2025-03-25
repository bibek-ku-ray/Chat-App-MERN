import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./db/connection.db.js";

// routes
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js"

const app = express()
const PORT  = process.env.PORT || 3001

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRouter)

// middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})