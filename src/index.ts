import { initExpress } from "./app.ts";
import { loadEnv } from "./config/env.ts";
import { initLogger } from "./config/logger.ts";

const env = loadEnv();

const logger = initLogger();

logger.info(`Starting server in ${env.NODE_ENV} mode...`);

const app = initExpress();

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
