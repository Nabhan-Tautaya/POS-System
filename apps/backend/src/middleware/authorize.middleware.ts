import type { Request, Response, NextFunction } from "express";

import { ForbiddenError } from "../shared/errors/forbidden.error.js";

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("You do not have permission");
    }
    next();
  };
}
