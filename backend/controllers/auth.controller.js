import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";
import userModel from "../models/user.model.js";

/**
 * @desc Register new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = asyncHandler(async (req, res) => {});

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res) => {});

/**
 * @desc Get current logged-in user
 * @route POST /api/auth/me
 * @access Private
 */
export const getCurrentUser = (req, res) => {};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = (req, res) => {};

/**
 * @desc Update profile
 * @route POST /api/auth/edit
 * @access Private
 */
export const updateProfile = asyncHandler(async (req, res) => {});

/**
 * @desc Delete profiel
 * @route DELETE /api/auth/delete
 * @access Private
 */
export const deleteProfile = asyncHandler(async (req, res) => {});