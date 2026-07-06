import express from "express";
import cors from "cors";
import healthRoutes from "./api/health/health.routes.js";

const app: express.Application = express();

app.use("/health", healthRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

export default app;
