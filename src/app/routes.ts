import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.ts";
import childrenRoutes from "../modules/children/children.routes.ts"; 

export function getRoutes(): Router {
  const router = Router();

  router.use("/health", healthRoutes);
  router.use("/children", childrenRoutes)

  return router;
}
