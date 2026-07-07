import type { Response } from "express";

export function sendSuccess<T>(res: Response, data: T, message = "Success") {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

export function sendCreated<T>(res: Response, data: T, message = "Created") {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

export function sendNoContent(res: Response) {
  return res.sendStatus(204);
}

export function sendError(
  res: Response,
  status: number,
  message: string,
  errors?: unknown,
) {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
}
