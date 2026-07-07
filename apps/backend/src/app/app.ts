import express from "express";
import cors from "cors";
import { requestLogger } from "../middleware/requestLogger.middleware.js";
import healthRoutes from "../routes/health.routes.js";
import { errorHandler } from "../middleware/error.middleware.js";
import { notFoundHandler } from "../middleware/notFound.middleware.js";

const app: express.Application = express();

app.use(express.json());

app.use(requestLogger);
app.use(healthRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
