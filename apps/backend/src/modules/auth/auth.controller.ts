import type { Request, Response, NextFunction } from "express";

import { authService } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const body = loginSchema.parse(req.body);
    try {
      const result = await authService.login(body.email, body.password);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
