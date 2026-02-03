import { Router } from "express";
import {
  getChildByIdController,
  getChildrenController,
  registerChildController,
  updateChildController,
} from "./children.controller.ts";
import { handleController } from "../../shared/http/handleController.ts";

const router = Router();

router.get("/", handleController(getChildrenController));
router.get("/:id", handleController(getChildByIdController));
router.post("/", handleController(registerChildController));
router.patch("/:id", handleController(updateChildController));

export default router;
