import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All bookings - Admin only
router.route("/").get(protect, admin, getBookings).post(protect, createBooking);

// Bookings by user
router.route("/user/:userId").get(protect, getBookingsByUser);

// Single booking
router.route("/:id").get(protect, getBookingById);

// Cancel booking
router.route("/:id/cancel").put(protect, cancelBooking);

// Update status (confirmed/completed)
router.route("/:id/status").put(protect, updateBookingStatus);

export default router;
