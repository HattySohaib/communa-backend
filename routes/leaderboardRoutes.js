import express from "express";
import {
  getGlobalLeaderboard,
  getCommunityLeaderboard,
  getUserBadges,
} from "../controllers/leaderboardController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Leaderboard routes
router.get("/leaderboard", getGlobalLeaderboard);
router.get("/leaderboard/:communityId", getCommunityLeaderboard);
router.get("/users/:id/badges", authenticate, getUserBadges);

export default router;
