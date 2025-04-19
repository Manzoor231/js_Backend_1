import { Post } from "../models/post.model.js";
import { User } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import thorwIf from "../utils/throwif.js";
import checkId from "../utils/checkId.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const post = await Post.create({ title, description, owner: userId });
  await User.findByIdAndUpdate(
    userId,
    { $push: { userPosts: post._id } },
    { new: true }
  );
  return sendResponse(res, 201, "Post Created", post);
});

export const getAllPost = asyncHandler(async (req, res, next) => {
  const post = await Post.find().populate("owner", "username email");
  thorwIf(!post, 404, "There is no Post");
  return sendResponse(res, 200, post);
});

export const getPostById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, "PostId");
  const post = await Post.findById(id);
  thorwIf(!post, 404, "There is no post");
  return sendResponse(res, 200, { msg: "Post Found", post });
});

export const deletePostById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  checkId(id, "PostId");
  const post = await Post.findByIdAndDelete(id);
  thorwIf(!post, 404, "there is no post");
  return sendResponse(res, 200, { msg: "post Deleted", deletedBy: {id: userId, Username: req.user.username} });
});

export const updatePostById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  checkId(id);
  const { username, email } = req.body;
  const post = await Post.findByIdAndUpdate(id, {
    username: username,
    email: email,
    owner: userId
  });
  thorwIf(!post, 404, "User Not Found");
  return sendResponse(res, 200, { msg: "user Updated", UserId: userId, username: req.user.username });
});
