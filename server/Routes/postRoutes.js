import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../Controllers/postController.js";

const postRoutes = express.Router();

postRoutes.get("/", getPosts);
postRoutes.post("/create", createPost);
postRoutes.patch("/update/:id", updatePost);
postRoutes.delete("/delete/:id", deletePost);

export default postRoutes;
