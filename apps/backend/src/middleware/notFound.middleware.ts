import type { NextFunction, Request, Response } from "express";

import { NotFoundError } from "../shared/errors/index.js";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
}
