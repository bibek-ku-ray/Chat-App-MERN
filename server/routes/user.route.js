import express from "express";

//controllers
import { login } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", login)

export default router