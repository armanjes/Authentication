import express from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
  updateProfile,
  deleteProfile,
} from "../controllers/index.js";
import { protect } from "../middlewares/index.js";

const router = express.Router();

/**
 * @desc POST /api/auth/register
 * @access Public
 */
router.post("/register", register);

/**
 * @desc POST /api/auth/login
 * @access Public
 */
router.post("/login", login);

/**
 * @desc GET /api/auth/me
 * @access Private
 */
router.get("/me", protect, getCurrentUser);

/**
 * @desc POST /api/auth/logout
 * @access Private
 */
router.post("/logout", protect, logout);

/**
 * @desc PATCH /api/auth/edit
 * @access Private
 */
router.patch("/edit", protect, updateProfile);

/**
 * @desc DELETE /api/auth/delete
 * @access Private
 */
router.delete("/delete", protect, deleteProfile);

export default router;
