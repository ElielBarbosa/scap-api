import { Router } from "express";

import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware.js";
import { UserController } from "../controllers/user.controller.js";
import { userIdSchema, userRegisterSchema } from "../schemas/user.schmea.js";
import { security } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

const userController: UserController = new UserController();

// userRouter.get("/:id", userController.getUser);
//.post("/", validateBody(userRegisterSchema), userController.registerNewUser);
userRouter.get("/:id", security, userController.getUser);
userRouter.post("/verify", userController.verifyUserExist);
userRouter.post("/getUserByToken", userController.getUserByToken);
