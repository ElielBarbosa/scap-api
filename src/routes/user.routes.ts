import { Router } from "express";

import { validateBody } from "../middlewares/validate.middleware.js";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

const userController: UserController = new UserController();

// userRouter.get("/:id", userController.getUser);
userRouter.post("/", userController.registerNewUser);
userRouter.get("/:id", userController.getUser);
