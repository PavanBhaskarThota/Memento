import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updateComment,
  updatePost,
} from "../Controllers/postController.js";
import { auth } from "../Middleware/auth.js";

const postRoutes = Router();

postRoutes.get("/", getPosts);
postRoutes.post("/create", auth, createPost);
postRoutes.patch("/update/:id", auth, updatePost);
postRoutes.delete("/delete/:id", auth, deletePost);
postRoutes.patch("/likePost/:id", auth, likePost);
postRoutes.get("/singlePost/:id", auth, getPostById);
postRoutes.patch("/updateComment/:id", auth, updateComment);

export default postRoutes;
