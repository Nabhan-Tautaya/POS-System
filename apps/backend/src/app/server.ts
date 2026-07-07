import app from "./app.js";
import logger from "../config/logger.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Error starting server: ${err}`);
    process.exit(1);
  }
  logger.info(`Backend running on port ${PORT}`);
});

export default app;
