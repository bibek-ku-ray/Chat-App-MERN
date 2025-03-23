import express from "express"
import "dotenv/config";

// routes
import userRouter from "./routes/user.route.js";

const app = express()
const PORT  = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/user", userRouter)


app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})