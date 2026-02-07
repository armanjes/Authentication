import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { asyncHandler, ApiError } from "../utils/index.js";
import userModel from "../models/user.model.js";
import {env} from "../config/index.js"

const protect = asyncHandler(async function (req, res, next) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Not authorized, no token.");
  }

  let decode;
  try {
    decode = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Token expired or invalid.");
  }

  if (!mongoose.Types.ObjectId.isValid(decode._id)) {
    throw new ApiError(400, "Invalid user.");
  }

  const user = userModel.findById(decode._id);

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

export default protect