import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.ts";
import childrenRoutes from "../modules/children/children.routes.ts";

export function getRoutes(): Router {
  const router = Router();

  // Routes
  router.use("/health", healthRoutes);
  router.use("/children", childrenRoutes);

  // Fallback
  router.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  return router;
}
