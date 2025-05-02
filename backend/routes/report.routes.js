import express from "express";
import {
  createReport,
  getAllReports,
  getUserReports,
  getReportById,
  updateReportStatus,
  deleteReport,
} from "../controllers/reportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, admin, getAllReports);
router.get("/user/:userId", protect, getUserReports);
router.get("/:id", protect, getReportById);
router.put("/:id/status", protect, admin, updateReportStatus);
