import { Router } from "express";

import { CampusController } from "../controllers/campus.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { dataCampus } from "../schemas/campus.schema.js";

export const campusRouter = Router();

const campusController: CampusController = new CampusController();

// userRouter.get("/:id", userController.getUser);
campusRouter.post(
  "/register",
  validateBody(dataCampus),
  campusController.registerNewCampus,
);
campusRouter.get("/", campusController.getAllCampus);
