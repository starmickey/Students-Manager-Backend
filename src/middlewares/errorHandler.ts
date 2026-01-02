import type { Request, Response } from "express";
import z, { ZodError } from "zod";
import { AppError } from "../shared/errors/AppError.ts";
import { logger } from "../config/logger.ts";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
) {
  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: z.prettifyError(error),
    });
  }

  // Known application errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  // Unknown / programming errors
  logger.error(error);

  return res.status(500).json({
    error: "Internal server error",
  });
}
