import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware.js";
import { dataObjectRegister } from "../schemas/object.schema.js";
import { ObjectController } from "../controllers/object.controller.js";

import configureUpload from "../utils/multerConfig.js";

export const objectRouter = Router();
const objectController = new ObjectController();

const upload = configureUpload();

objectRouter.post("/", upload.single('image'), objectController.registerNewObject);
objectRouter.get("/campus/:id", objectController.getAllObjectsByCampus);
objectRouter.get("/:id", objectController.getObjectById);
objectRouter.put("/:id", objectController.updateObjectById);
objectRouter.delete("/:id", objectController.deleteObjectById);

