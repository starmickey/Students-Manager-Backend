export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational = true;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
