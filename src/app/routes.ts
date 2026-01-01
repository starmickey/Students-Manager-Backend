import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.ts";

export function getRoutes(): Router {
  const router = Router();

  router.use("/health", healthRoutes);

  return router;
}
