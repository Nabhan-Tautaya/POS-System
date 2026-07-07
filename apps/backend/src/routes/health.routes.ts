import { Router } from "express";

const router: Router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "POS API",
    timestamp: new Date().toISOString(),
  });
});

export default router;
