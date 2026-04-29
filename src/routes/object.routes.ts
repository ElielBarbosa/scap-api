import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware.js";
import { dataObjectRegister } from "../schemas/object.schema.js";
import { ObjectController } from "../controllers/object.controller.js";

export const objectRouter = Router();

const objectController: ObjectController = new ObjectController();

objectRouter.post(
  "/",
  validateBody(dataObjectRegister),
  objectController.registerNewObject,
);

objectRouter.get("/", objectController.getAllObjects);
objectRouter.get("/:id", objectController.getObjectById);
objectRouter.put("/:id", objectController.updateObjectById);
objectRouter.delete("/:id", objectController.deleteObjectById);

