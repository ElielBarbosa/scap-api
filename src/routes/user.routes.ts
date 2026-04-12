import { Router } from "express";

import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import { UserController } from "../controllers/user.controller.js";
import { userIdSchema, userRegisterSchema } from "../schemas/user.schmea.js";

export const userRouter = Router();

const userController: UserController = new UserController();

// userRouter.get("/:id", userController.getUser);
userRouter.post("/", validateBody(userRegisterSchema), userController.registerNewUser);
userRouter.get("/:id", validateParams(userIdSchema), userController.getUser);
