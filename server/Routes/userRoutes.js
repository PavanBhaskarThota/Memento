import { Router } from "express";
import userController from "../Controllers/userController.js";
import { auth } from "../Middleware/auth.js";

const userRoutes = Router();

userRoutes.post("/create", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/isUserNameTaken/:name", userController.isUserNameTaken);
userRoutes.get("/:id", auth, userController.getUserData);
userRoutes.patch("/:id", auth, userController.updateUser);

export default userRoutes;
