import { Router } from "express";
import { registerChildController } from "./children.controller.ts";
import { handleController } from "../../shared/http/handleController.ts";

const router = Router();

router.post("/", handleController(registerChildController));

export default router;
