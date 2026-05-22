// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { userRegisterSchema } from "../schemas/user.schmea.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const authController = new AuthController();

export const authRoutes = Router();

authRoutes.post("/signin", authController.login);
authRoutes.post("/signup", validateBody(userRegisterSchema), authController.registerNewUser);
authRoutes.post("/verify-token", authController.validateToken);
