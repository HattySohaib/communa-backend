import express from "express";
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
} from "../controllers/communityController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Community routes
router.post("/communities", authenticate, createCommunity);
router.get("/communities", getAllCommunities);
router.get("/communities/:id", getCommunityById);
router.post("/communities/:id/join", authenticate, joinCommunity);
router.post("/communities/:id/leave", authenticate, leaveCommunity);
router.delete("/communities/:id", authenticate, deleteCommunity);

export default router;
