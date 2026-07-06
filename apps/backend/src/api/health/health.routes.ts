import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
  });
});

export default router;
