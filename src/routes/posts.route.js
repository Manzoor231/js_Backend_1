import { Router } from "express";
import { createPost, deletePostById, getAllPost, getPostById, updatePostById } from "../controllers/posts.controller.js";
import { protect } from "../middlewares/auth.js";
const postRoute = Router();

postRoute.post("/createPost", protect, createPost);
postRoute.get('/posts', getAllPost);
postRoute.get('/posts/:id', getPostById)
postRoute.delete('/posts/:id',protect, deletePostById);
postRoute.put('/posts/:id',protect, updatePostById);
export default postRoute;