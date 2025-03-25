import express from "express"
import "dotenv/config";

import { connectDB } from "./db/connection.db.js";

// routes
import userRouter from "./routes/user.route.js";

const app = express()
const PORT  = process.env.PORT || 3001

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/user", userRouter)

// middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})