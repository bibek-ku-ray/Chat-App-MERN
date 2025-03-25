import express from "express";

//controllers
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login)
router.post("/signup", register)
router.get("/get-profile", isAuthenticated, getProfile)
router.post("/logout", isAuthenticated, logout)

export default router