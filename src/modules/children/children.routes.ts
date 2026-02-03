import { Router } from "express";
import {
  getChildrenController,
  registerChildController,
  updateChildController,
} from "./children.controller.ts";
import { handleController } from "../../shared/http/handleController.ts";

const router = Router();

router.get("/", handleController(getChildrenController));
router.post("/", handleController(registerChildController));
router.patch("/:id", handleController(updateChildController));

export default router;
