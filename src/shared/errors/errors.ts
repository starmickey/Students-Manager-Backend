import { AppError } from "./AppError.ts";

export const BadRequestError = (message: string) =>
  new AppError(message, 400);

export const NotFoundError = (message = "Resource not found") =>
  new AppError(message, 404);

export const ConflictError = (message: string) =>
  new AppError(message, 409);

export const InternalServerError = (
  message = "Internal server error"
) => new AppError(message, 500);
