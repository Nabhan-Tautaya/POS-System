import type { Request, Response } from "express";
import { Router } from "express";
import { authController } from "./auth.controller.js";

const router: Router = Router();

router.post("/login", authController.login.bind(authController));

export default router;
