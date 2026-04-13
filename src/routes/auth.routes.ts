// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authController = new AuthController();

export const authRoutes = Router();

authRoutes.post("/login", authController.login);
