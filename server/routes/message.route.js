import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/send/:receiverId", isAuthenticated, sendMessage);
router.get("/get/:otherParticipantId", isAuthenticated, getMessage);

export default router