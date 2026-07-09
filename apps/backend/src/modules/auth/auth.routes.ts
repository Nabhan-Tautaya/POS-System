import type { Request, Response } from "express";
import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { Roles } from "../../shared/constants/roles.js";

const router: Router = Router();

router.post("/login", authController.login.bind(authController));
router.get(
  "/me",
  authenticate,
  authorize(Roles.PLATFORM_ADMIN),
  authController.me.bind(authController),
);
export default router;
