import express from "express";
const router = express.Router();

import {
  createOrUpdateSubscription,
  getMySubscription,
  deactivateSubscription,
  checkExpiredSubscriptions,
} from "../controllers/subscription.controller.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// Create or update a subscription
router.post("/", protect, createOrUpdateSubscription);

// Get current user's subscription
router.get("/mine", protect, getMySubscription);

// Deactivate a subscription (admin only)
router.put("/:id/deactivate", protect, admin, deactivateSubscription);

// Check and deactivate expired subscriptions (admin only)
router.get("/check-expired", protect, admin, checkExpiredSubscriptions);

export default router;
