import express, { type Express } from "express";
import { getRoutes } from "./routes.ts";

export function initExpress(): Express {
  const app = express();

  // Core middleware
  app.use(express.json());

  // Routes
  app.use(getRoutes());

  // Fallback
  app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  return app;
}
