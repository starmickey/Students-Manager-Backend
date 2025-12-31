import { initExpress } from "./app.ts";
import { loadEnv } from "./config/env.ts";

const env = loadEnv();

const app = initExpress();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
