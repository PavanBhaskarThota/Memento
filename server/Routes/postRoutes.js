import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../Controllers/postController.js";
import { auth } from "../Middleware/auth.js";

const postRoutes = Router();

postRoutes.get("/", getPosts);
postRoutes.post("/create", auth, createPost);
postRoutes.patch("/update/:id", auth, updatePost);
postRoutes.delete("/delete/:id", auth, deletePost);
postRoutes.patch("/likePost/:id", auth, likePost);

export default postRoutes;
