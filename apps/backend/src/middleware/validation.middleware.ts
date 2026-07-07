import type { AnyZodObject } from "zod/v3";
import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../shared/constants/httpStatus.js";
import { ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validated.body;
      req.params = validated.params;
      req.query = validated.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors: error.issues,
        });
      }

      next(error);
    }
  };
