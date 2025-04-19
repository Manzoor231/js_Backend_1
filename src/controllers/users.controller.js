import mongoose from "mongoose";
import { User } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import thorwIf from "../utils/throwif.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkId from "../utils/checkId.js";
// export const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // if (!username || !email || !password)
//     //   return res.status(400).json({ error: "All fields are required" });
//     const existUser = await User.findOne({ username });
//     if (existUser) throw new ApiError(404, "username Already Exist");
//     const user = await User.create({
//       username: username,
//       email: email,
//       password: password,
//     });
//     return res.status(201).json({ msg: "User created Succesfully", user });
//   } catch (error) {
//     throw new ApiError(500, "Internel Server Error");
//   }
// };

export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ username });
  thorwIf(userExist, 400, "User ALready Exist");
  const user = await User.create({
    username,
    email,
    password,
  });
  return sendResponse(res, 201, "User Created Successfully", user);
});
export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  thorwIf(!user, 401, "User Not Found");
  const isMatch = await bcrypt.compare(password, user.password);
  thorwIf(!isMatch, 400, "Password Didn't Match");
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return sendResponse(res, 200, `User Logged in`, {
    token,
    user: { username: user.username, email: user.email },
  });
});
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find().populate("userPosts");
  thorwIf(user.length === 0, 404, "User Not Found");
  return sendResponse(res, 200, user, "Data Fetched");
});

export const deleteUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  checkId(id, "UserId");
  const user = await User.findByIdAndDelete(id);
  thorwIf(!user, 404, "THere is NO User");
  return sendResponse(res, 200, "User Deleted Successfully", {deletedPost: user, deletedBy: req.user.username, id:req.user._id});
});
export const findUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  thorwIf(!mongoose.Types.ObjectId.isValid(id), 400, "Invalid UseriD pattern");
  const user = await User.findById(id);
  thorwIf(!user, 404, "this is empty");
  return sendResponse(res, 200, "User by Id", user);
});

export const updateUserbyId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;
  thorwIf(!mongoose.Types.ObjectId.isValid(id), 400, "Invalid UserId Pattern");
  const user = await User.findByIdAndUpdate(id, {
    username: username,
    email: email,
  });
  thorwIf(!user, 404, "User Not Found");
  return sendResponse(res, 200, "User Updated", user);
});
