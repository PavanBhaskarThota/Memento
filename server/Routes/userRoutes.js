import { Router } from "express";
import userController from "../Controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/create", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/isUserNameTaken/:name", userController.isUserNameTaken);
userRoutes.get("/:id", userController.getUserData);

export default userRoutes;
