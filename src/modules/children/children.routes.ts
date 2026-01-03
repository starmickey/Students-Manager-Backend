import { Router } from "express";
import {
  getChildrenController,
  registerChildController,
} from "./children.controller.ts";
import { handleController } from "../../shared/http/handleController.ts";

const router = Router();

router.get("/", handleController(getChildrenController));
router.post("/", handleController(registerChildController));

export default router;
