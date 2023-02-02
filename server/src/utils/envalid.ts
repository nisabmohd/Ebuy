import { cleanEnv } from "envalid";
import { port, str, bool } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  DEV: bool(),
});
