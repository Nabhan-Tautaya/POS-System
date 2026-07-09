import express from "express";
import cors from "cors";
import routes from "../routes/index.js";

import { requestLogger } from "../middleware/requestLogger.middleware.js";
import { errorMiddleware } from "../middleware/error.middleware.js";
import { notFoundMiddleware } from "../middleware/notFound.middleware.js";

import healthRoutes from "../routes/health.routes.js";

const app: express.Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use(requestLogger);

app.use("/api", routes);

// Unknown route
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;
