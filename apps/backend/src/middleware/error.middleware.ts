import type { NextFunction, Request, Response } from "express";

import { AppError } from "../shared/errors/app.error.js";
import { env } from "../config/env.js";
import logger from "../config/logger.js";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.originalUrl,
  });

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        type: error.name,
        message: error.message,
      },
    });
  }

  const response: any = {
    success: false,
    error: {
      type: "InternalServerError",
      message: "Something went wrong.",
    },
  };

  if (env.NODE_ENV === "development") {
    response.error.message = error.message;
    response.error.stack = error.stack;
  }

  return res.status(500).json(response);
}
