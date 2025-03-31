import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  getUserById,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/logout", authenticate, logoutUser);

// User profile routes
router.get("/users/me", authenticate, getCurrentUser);
router.put("/users/me", authenticate, updateUserProfile);
router.get("/users/:id", authenticate, getUserById);

export default router;
