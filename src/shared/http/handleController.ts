import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../middlewares/errorHandler.ts";

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => unknown | Promise<unknown>;

export function handleController(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
