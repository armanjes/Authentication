import { asyncHandler, ApiResponse, ApiError } from "../utils/index.js";
import userModel from "../models/user.model.js";

/**
 * @desc Register new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = asyncHandler(async (req, res) => {
  /**
   * validate name, email, password
   * check if user exists with email
   * create user
   * generate token
   * send response
   */

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists.");
  }

  const user = new userModel({ name, email, password });

  const accessToken = user.accessToken();

  await user.save();

  return res
    .status(201)
    .cookie("accessToken", accessToken)
    .json(new ApiResponse(user, "User created successfull"));
});

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res) => {
  /**
   * validate email & password
   * find user with email
   * compare password
   * generate token
   * send response
   */

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const accessToken = user.accessToken();

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .json(new ApiResponse(data, "Login successfull"));
});

/**
 * @desc Get current logged-in user
 * @route POST /api/auth/me
 * @access Private
 */
export const getCurrentUser = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(req.user, "User fetching successfull."));
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse({}, "Logout successful."));
};

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