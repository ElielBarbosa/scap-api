import { Router } from "express";

import { CampusController } from "../controllers/campus.controller.js";

export const campusRouter = Router();

const campusController: CampusController = new CampusController();

// userRouter.get("/:id", userController.getUser);
campusRouter.post("/register", campusController.registerNewCampus);
campusRouter.get("/", campusController.getAllCampus);