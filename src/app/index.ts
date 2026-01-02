import cors from "cors";
import express, { type Express } from "express";
import { getRoutes } from "./routes.ts";
import { requestLogger } from "../middlewares/requestLogger.ts";

export function initExpress(): Express {
  const app = express();

  app.use(
    cors({
      origin: (_origin, callback) => callback(null, true), // allow any. Replace by frontend path. ex."http://localhost:3002",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(express.json());

  app.use(requestLogger);

  app.use(getRoutes());

  return app;
}
