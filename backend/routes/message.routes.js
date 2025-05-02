import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:userId", protect, getMessages);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
