import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.ts";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  logger.debug({
    method: req.method,
    path: req.originalUrl,
    headers: req.headers,
    body: req.body,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.http({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
    });
  });

  next();
}
